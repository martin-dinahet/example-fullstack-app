import { prisma } from "../../prisma";
import type { CreateTodoDTO } from "./dto";

export class TodosService {
  public async getAllTodos() {
    return await prisma.todo.findMany();
  }

  public async getAllTodosForUser(userId: string) {
    return await prisma.todo.findMany({ where: { userId } });
  }

  public async getTodoById(id: string) {
    return await prisma.todo.findUnique({ where: { id } });
  }

  public async getTodoByIdForUser(id: string, userId: string) {
    return await prisma.todo.findUnique({ where: { id, userId } });
  }

  public async createTodo(data: CreateTodoDTO) {
    return await prisma.todo.create({ data });
  }
}
