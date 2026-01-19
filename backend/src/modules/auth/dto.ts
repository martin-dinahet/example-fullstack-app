import type { JWTPayload } from "hono/utils/jwt/types";

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

export type LoginApiResponseDTO = {
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};

export type RegisterApiResponseDTO = {
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};

export type GetCurrentUserApiResponseDTO = {
  currentUser: JWTPayload & {
    id: string;
    username: string;
    email: string;
  };
};
