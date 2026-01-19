import { App } from "./core/app";
import { AuthController } from "./modules/auth/controller";

const app = new App([
	new AuthController(), // auth
]);

app.listen(3000);
