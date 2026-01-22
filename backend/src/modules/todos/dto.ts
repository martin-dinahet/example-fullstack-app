import type { TodoStatus } from "../../generated/prisma/client";

export type CreateTodoDTO = {
  title: string;
};

export type UpdateTodoDTO = {
  title?: string;
  completed?: TodoStatus;
};
