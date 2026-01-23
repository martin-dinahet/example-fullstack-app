export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
export type SuccessOf<T> = T extends SuccessResponse<infer Data> ? Data : never;
export type ErrorOf<T> = T extends ErrorResponse | infer _ ? ErrorResponse["errors"] : never;

export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  errors: Record<string, string[]>;
};

export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserDTO = {
  username?: string;
  email?: string;
  password?: string;
};

export type CreateTodoDTO = {
  title: string;
};

export type UpdateTodoDTO = {
  title?: string;
  completed?: TodoStatus;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  username: string;
  email: string;
  password: string;
};

export type JWTPayload = {
  [key: string]: unknown;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  iss?: string | undefined;
  aud?: string | string[] | undefined;
};

export type Todo = {
  id: string;
  title: string;
  completed: TodoStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type LoginResponse = ApiResponse<{
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}>;

export type RegisterResponse = ApiResponse<{
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}>;

export type GetCurrentUserResponse = ApiResponse<{
  currentUser: JWTPayload & {
    id: string;
    username: string;
    email: string;
  };
}>;

export type UpdateCurrentUserResponse = ApiResponse<{
  token: string;
  user: {
    email: string;
    username: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}>;

export type DeleteCurrentUserResponse = ApiResponse<{
  user: {
    email: string;
    username: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}>;

export type RefreshTokenResponse = ApiResponse<{
  token: string;
}>;

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
