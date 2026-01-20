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

export type LoginResDTO = {
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};

export type RegisterRDTO = {
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
};

export type GetCurrentUserRDTO = {
  currentUser: JWTPayload & {
    id: string;
    username: string;
    email: string;
  };
};

export type UpdateCurrentUserRDTO = {
  user: {
    email: string;
    password: string;
    username: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
