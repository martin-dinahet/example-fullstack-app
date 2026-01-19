import { compare, hash } from "bcrypt";
import { z } from "zod";
import { AbstractController } from "../../core/controller";
import type { CurrentUser } from "../../types";
import type { GetCurrentUserApiResponseDTO, LoginApiResponseDTO, RegisterApiResponseDTO } from "./dto";
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
      });
      return this.ok<LoginApiResponseDTO>(c, {
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
      });
      return this.ok<RegisterApiResponseDTO>(c, {
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
      return this.ok<GetCurrentUserApiResponseDTO>(c, {
        currentUser,
      });
    });
  }
}
