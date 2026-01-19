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
