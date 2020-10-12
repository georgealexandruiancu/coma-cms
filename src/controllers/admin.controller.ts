import { Request, Response } from "express";
import { connect } from "../database";
import { Admin } from "../interface/Admin";

export function IndexAdmin (req: Request, res: Response): Response {
	return res.json("COMA-CMS | ADMINS");
}

export async function CreateAdmin (req: Request, res: Response): Promise<Response> {

	if (req.body.super_password === process.env.SUPER_MASTER_PASSWORD) {

		const newAdmin:Admin = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		};

		const conn = await connect();

		conn.query("INSERT INTO admins SET ?", [newAdmin])

		return res.json({
			message: "Admin created successfully",
			status: 200
		});
	}
	else {
		return res.status(401);
	}

}