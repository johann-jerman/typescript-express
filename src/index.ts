import { App } from "./app";
import { UserRoutes } from "./routes/Users.routes";

const app = new App([new UserRoutes])

app.listen()