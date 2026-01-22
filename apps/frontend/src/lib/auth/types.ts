import type { ApiResponse } from "../types";

export type JWTPayload = {
  [key: string]: unknown;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  iss?: string | undefined;
  aud?: string | string[] | undefined;
};

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
