import type {
  DeleteCurrentUserResponse,
  GetCurrentUserResponse,
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
  UpdateCurrentUserResponse,
} from "@repo/types";
import { compare, hash } from "bcrypt";
import { z } from "zod";
import { AbstractController } from "../../core/controller";
import type { CurrentUser } from "../../types";
import type { UpdateUserDTO } from "./dto";
import { AuthService } from "./service";

export class AuthController extends AbstractController {
  public path = "/auth";
  private service = new AuthService();
  private middleware = this.createAuthMiddleware();

  private schemas = {
    login: z.object({
      email: z.email(),
      password: z.string().min(8),
    }),
    register: z.object({
      username: z.string(),
      email: z.email(),
      password: z.string().min(8),
    }),
    update: z.object({
      username: z.string().optional(),
      email: z.email().optional(),
      password: z.string().min(8).optional(),
    }),
  };

  public mount() {
    this.router.post("/login", this.validateUsing(this.schemas.login), async (c) => {
      const { email, password } = c.req.valid("json");
      const user = await this.service.getUserByEmail(email);
      if (!user) return this.fail(c, { email: ["User not found"] });
      const isValid = await compare(password, user.password);
      if (!isValid) return this.fail(c, { password: ["Incorrect password"] });
      const token = await this.generateToken<CurrentUser>({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
      return this.ok<LoginResponse>(c, {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        token,
      });
    });

    this.router.post("/register", this.validateUsing(this.schemas.register), async (c) => {
      const { username, email, password } = c.req.valid("json");
      const existingUser = await this.service.getUserByEmail(email);
      if (existingUser) return this.fail(c, { email: ["Email already in use"] });
      const hashedPassword = await hash(password, 12);
      const user = await this.service.createUser({
        username,
        email,
        password: hashedPassword,
      });
      const token = await this.generateToken<CurrentUser>({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
      return this.ok<RegisterResponse>(c, {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        token,
      });
    });

    this.router.get("/me", this.middleware, async (c) => {
      const currentUser = c.get("currentUser");
      const user = await this.service.getUserById(currentUser.id);
      if (!user) return this.fail(c, { server: ["User not found"] });
      return this.ok<GetCurrentUserResponse>(c, {
        currentUser: {
          id: user?.id,
          username: user?.username,
          email: user?.email,
          exp: currentUser.exp,
        },
      });
    });

    this.router.patch("/me", this.validateUsing(this.schemas.update), this.middleware, async (c) => {
      const currentUser = c.get("currentUser");
      const data = c.req.valid("json");
      if (data.email && data.email !== currentUser.email) {
        const existingUser = await this.service.getUserByEmail(data.email);
        if (existingUser) return this.fail(c, { email: ["Email already in use"] });
      }
      const updateData: UpdateUserDTO = {};
      if (data.username) updateData.username = data.username;
      if (data.email) updateData.email = data.email;
      if (data.password) updateData.password = await hash(data.password, 12);
      const result = await this.service.updateUser(currentUser.id, updateData);
      const token = await this.generateToken<CurrentUser>({
        id: result.id,
        username: result.username,
        email: result.email,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });
      return this.ok<UpdateCurrentUserResponse>(c, {
        token,
        user: {
          id: result.id,
          username: result.username,
          email: result.email,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
      });
    });

    this.router.delete("/me", this.middleware, async (c) => {
      const currentUser = c.get("currentUser");
      const result = await this.service.deleteUser(currentUser.id);
      return this.ok<DeleteCurrentUserResponse>(c, {
        user: result,
      });
    });

    this.router.get("/refresh", this.middleware, async (c) => {
      const currentUser = c.get("currentUser");
      const user = await this.service.getUserById(currentUser.id);
      if (!user) return this.fail(c, { server: ["User not found"] });
      const token = await this.generateToken<CurrentUser>({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
      return this.ok<RefreshTokenResponse>(c, { token });
    });
  }
}
