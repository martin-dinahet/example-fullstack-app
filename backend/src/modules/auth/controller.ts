import { AbstractController } from "../../core/controller";

export class AuthController extends AbstractController {
	public path = "/auth";

	public mount(): void {
		throw new Error("Method not implemented.");
	}
}
