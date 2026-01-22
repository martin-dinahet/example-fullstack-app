import { z } from "zod";
import { AbstractController } from "../../core/controller";
import { TodoStatus } from "../../generated/prisma/enums";
import type { CreateTodoResponse, GetAllTodosResponse, GetTodoByIdResponse, UpdateTodoResponse } from "./responses";
import { TodosService } from "./service";

export class TodosController extends AbstractController {
  public path = "/todos";
  private middleware = this.createAuthMiddleware();
  private service = new TodosService();

  public schemas = {
    create: z.object({
      title: z.string(),
    }),
    update: z.object({
      title: z.string().optional(),
      completed: z.enum(TodoStatus).optional(),
    }),
  };

  public mount() {
    this.router.get("/", this.middleware, async (c) => {
      const currentUser = c.get("currentUser");
      const result = await this.service.getAllTodosForUser(currentUser.id);
      return this.ok<GetAllTodosResponse>(c, { todos: result });
    });

    this.router.post("/", this.middleware, this.validateUsing(this.schemas.create), async (c) => {
      const data = c.req.valid("json");
      const currentUser = c.get("currentUser");
      const result = await this.service.createTodo(currentUser.id, data);
      return this.ok<CreateTodoResponse>(c, { todo: result });
    });

    this.router.get("/:id", this.middleware, async (c) => {
      const id = c.req.param("id");
      const currentUser = c.get("currentUser");
      const result = await this.service.getTodoByIdForUser(id, currentUser.id);
      return this.ok<GetTodoByIdResponse>(c, { todo: result });
    });

    this.router.patch("/:id", this.middleware, this.validateUsing(this.schemas.update), async (c) => {
      const id = c.req.param("id");
      const data = c.req.valid("json");
      const currentUser = c.get("currentUser");
      const result = await this.service.updateTodo(id, currentUser.id, data);
      return this.ok<UpdateTodoResponse>(c, { todo: result });
    });
  }
}
