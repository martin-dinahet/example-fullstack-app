import type { ApiResponse } from "../../core/response";
import type { Todo } from "../../generated/prisma/client";

export type GetAllTodosResponse = ApiResponse<{
  todos: Todo[];
}>;

export type CreateTodoResponse = ApiResponse<{
  todo: Todo;
}>;

export type GetTodoByIdResponse = ApiResponse<{
  todo: Todo | null;
}>;

export type UpdateTodoResponse = ApiResponse<{
  todo: Todo;
}>;

export type DeleteTodoResponse = ApiResponse<{
  todo: Todo;
}>;
