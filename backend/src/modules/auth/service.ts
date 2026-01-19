import { prisma } from "../../prisma";
import type { CreateUserDTO, UpdateUserDTO } from "./dto";

export class AuthService {
	public async getUserByEmail(email: string) {
		return await prisma.user.findUnique({
			where: { email },
		});
	}

	public async getUserById(id: string) {
		return await prisma.user.findUnique({
			where: { id },
		});
	}

	public async createUser(data: CreateUserDTO) {
		return await prisma.user.create({
			data,
		});
	}

	public async updateUser(id: string, data: UpdateUserDTO) {
		return await prisma.user.update({
			where: { id },
			data,
		});
	}

	public async deleteUser(id: string) {
		return await prisma.user.delete({
			where: { id },
		});
	}
}
