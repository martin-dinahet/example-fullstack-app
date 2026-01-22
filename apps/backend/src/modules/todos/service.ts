import type { CreateTodoDTO, UpdateTodoDTO } from "@repo/types";
import { prisma } from "../../prisma";

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

  public async createTodo(userId: string, data: CreateTodoDTO) {
    return await prisma.todo.create({ data: { userId, ...data } });
  }

  public async updateTodo(id: string, userId: string, data: UpdateTodoDTO) {
    return await prisma.todo.update({ where: { id, userId }, data });
  }

  public async deleteTodo(id: string, userId: string) {
    return await prisma.todo.delete({ where: { id, userId } });
  }
}
