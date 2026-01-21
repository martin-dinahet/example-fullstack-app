import type { JWTPayload } from "hono/utils/jwt/types";
import type { ApiResponse } from "../../core/response";

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
  user: {
    email: string;
    password: string;
    username: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}>;

export type DeleteCurrentUserResponse = ApiResponse<{
  user: {
    email: string;
    password: string;
    username: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}>;
