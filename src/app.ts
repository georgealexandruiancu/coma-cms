import express, { Application } from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import session from "express-session";

// =====================
// -- ROUTES
// =====================

import IndexRouter from "./routes/index.routes";
import AdminRoutes from "./routes/admin.routes";

export class App {

	private app: Application;

	constructor (private port?: number | string) {
		dotenv.config();

		this.app = express();

		this.settings();
		this.middlewares();
		this.routes();
	}

	settings () {
		this.app.set("port", this.port || process.env.PORT || 3000);
	}

	middlewares () {
		this.app.use(morgan('dev'));

		this.app.use(session({
			name: "uid_session",
			secret: "canttouchthis",
			resave: true,
			saveUninitialized: true
		}));

		this.app.use(express.json());
	}

	async listen () {
		await this.app.listen(this.app.get("port"));

		console.log("Server is running on port " + this.app.get("port"));
	}

	routes () {
		this.app.use("/api", IndexRouter);
		this.app.use("/api/admins", AdminRoutes);
	}

}