export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserDTO = {
  username?: string;
  email?: string;
  password?: string;
};
