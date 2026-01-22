import type { JWTPayload } from "hono/utils/jwt/types";

export type CurrentUser = JWTPayload & {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AppVariables = {
  currentUser: CurrentUser;
};
