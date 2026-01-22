import { z } from "zod";
import { AbstractController } from "../../core/controller";
import type { CreateTodoResponse, GetAllTodosResponse } from "./responses";
import { TodosService } from "./service";

export class TodosController extends AbstractController {
  public path = "/todos";
  private middleware = this.createAuthMiddleware();
  private service = new TodosService();

  public schemas = {
    create: z.object({
      title: z.string(),
    }),
  };

  public mount() {
    this.router.get("/", this.middleware, async (c) => {
      const result = await this.service.getAllTodos();
      return this.ok<GetAllTodosResponse>(c, { todos: result });
    });

    this.router.post("/", this.middleware, this.validateUsing(this.schemas.create), async (c) => {
      const data = c.req.valid("json");
      const currentUser = c.get("currentUser");
      const result = await this.service.createTodo({ title: data.title, userId: currentUser.id });
      return this.ok<CreateTodoResponse>(c, { todo: result });
    });
  }
}
