import { Request, Response } from "express";
import { connect } from "../database";
import { Admin } from "../interface/Admin";

function checkSuperUser(password:string) {
	return process.env.SUPER_MASTER_PASSWORD === password;
}

export function IndexAdmin (req: Request, res: Response): Response {
	return res.json("COMA-CMS | ADMINS");
}

export async function CreateAdmin (req: Request, res: Response): Promise<Response> {

	if (checkSuperUser(req.body.super_password)) {

		const newAdmin:Admin = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		};

		try {
			const conn = await connect();

			await conn.query("INSERT INTO admins SET ?", [newAdmin]);

			return res.json({
				message: "Admin created successfully",
				status: 200,
			});

		} catch (error) {
			return res.json({
				message: "There is an error with server, please try again later",
				status: 500
			});
		}

	}
	else {
		return res.status(401);
	}

}

export async function UpdateAdmin (req: Request, res: Response): Promise<Response> {

	if (checkSuperUser(req.body.super_password)) {
		try {
			const id = req.body.id;

			const updatedAdmin:Admin = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			};

			const conn = await connect();

			await conn.query("UPDATE admins SET ? WHERE id = ?", [updatedAdmin, id]);

			return res.json({
				message: "Admin updated successfully",
				status: 200,
			});
		} catch (error) {
			return res.json({
				message: "There is an error with server, please try again later",
				status: 500
			});
		}
	}
	else {
		return res.json({
			message: "Forbidden",
			status: 401
		});
	}
}

export async function DeleteAdmin (req: Request, res: Response): Promise<Response> {
	if (checkSuperUser(req.body.super_password)) {
		try {
			const id = req.body.id;

			const conn = await connect();

			await conn.query("DELETE FROM admins WHERE id = ?", [id]);

			return res.json({
				message: "Admin deleted successfully",
				status: 200
			});
		} catch (error) {
			return res.json({
				message: "There is an error with server, please try again later",
				status: 500
			});
		}
	}
	else {
		return res.json({
			message: "Forbidden",
			status: 401
		});
	}
}