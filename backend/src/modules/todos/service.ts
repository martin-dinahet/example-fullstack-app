import { prisma } from "../../prisma";
import type { CreateTodoDTO } from "./dto";

export class TodosService {
  public async getAllTodos() {
    return await prisma.todo.findMany();
  }

  public async createTodo(data: CreateTodoDTO) {
    return await prisma.todo.create({ data });
  }
}
