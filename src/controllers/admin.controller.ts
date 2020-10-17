import { Request, Response } from "express";
import { connect } from "../database";
import { Admin } from "../interface/Admin";

// Encryptor
import bcrypt from "bcrypt";

// Validators
import { checkSuperUser, registerValidation, checkIfAdminIsLoggedIn } from "../validations/validations";

export function IndexAdmin (req: Request, res: Response): Response {
	return res.json("COMA-CMS | ADMINS");
}

export async function CreateAdmin (req: Request, res: Response): Promise<Response> {

	const registerCheck = await registerValidation(req.body);
	if (registerCheck !== true) {
		return res.json({
			message: registerCheck.details[0].message,
			status: 400,
			registerCheck
		});
	}

	if (checkSuperUser(req.body.super_password)) {

		try {
			const conn = await connect();

			const result = await conn.query("SELECT * FROM admins WHERE email = ?", [req.body.email]);

			if (Object.values(result[0]).length > 0) {
				return res.json({
					message: "Forbidden",
					status: 401
				});
			}
			else {

				// HASH THE PASSWORD
				const password = await bcrypt.hash(req.body.password, 10);

				// CONSTRUCT THE NEW OBJECT FOR ADMIN
				const newAdmin: Admin = {
					name: req.body.name,
					email: req.body.email,
					password: password,
					role: req.body.role,
				};

				await conn.query("INSERT INTO admins SET ?", [newAdmin]);

				return res.json({
					message: "Admin created successfully",
					status: 200,
				});
			}
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

export async function UpdateAdmin (req: Request, res: Response): Promise<Response> {

	if (checkSuperUser(req.body.super_password)) {
		try {
			const id = req.body.id;

			// HASH THE PASSWORD
			const password = await bcrypt.hash(req.body.password, 10);

			// CONSTRUCT THE NEW OBJECT FOR ADMIN
			const updatedAdmin:Admin = {
				name: req.body.name,
				email: req.body.email,
				password: password,
				role: req.body.role
			};

			const conn = await connect();

			await conn.query("UPDATE admins SET ?, updated_date=now() WHERE id = ?", [updatedAdmin, id]);

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

export async function LoginAdmin (req: Request, res: Response): Promise<Response> {

	if (checkIfAdminIsLoggedIn(req.session)) {
		return res.json({
			message: "You are already logged in",
			status: 200
		});
	}

	try {
		const conn = await connect();

		const storedAdmin = await conn.query("SELECT * FROM admins WHERE email = ? LIMIT 1", [req.body.email]);

		if (Object.values(storedAdmin[0]).length > 0) {
			const currentAdmin = Object.values(storedAdmin[0])[0];
			const passwordToCompare = currentAdmin.password;

			const isThePasswordCorrect = bcrypt.compare(passwordToCompare, req.body.password);

			if (isThePasswordCorrect) {
				req!.session!.adminLogged = {
					loggedIn: true,
					id: currentAdmin.id,
					name: currentAdmin.name,
					email: currentAdmin.email
				};

				return res.json({
					message: "Logged in",
					status: 200
				});
			}
			else {
				return res.json({
					message: "Incorrect Email and/or Password!",
					status: 401
				})
			}
		}
		else {
			return res.json({
				message: "There is an error with server, please try again later 1",
				status: 500,
			});
		}

	} catch (error) {
		return res.json({
			error,
			message: "There is an error with server, please try again later 2",
			status: 500
		});
	}
}

export async function LogoutAdmin (req: Request, res: Response): Promise<Response> {
	if (checkIfAdminIsLoggedIn(req.session)) {
		delete req!.session!.adminLogged;

		return res.json({
			message: "Logged out",
			status: 200
		});
	}
	else {
		return res.json({
			message: "Please login first !",
			status: 401
		});
	}
}

export async function WhoamiAdmin (req: Request, res: Response): Promise<Response> {
	if (checkIfAdminIsLoggedIn(req.session)) {
		return res.json({
			iam: req!.session!.adminLogged,
			status: 200
		});
	}
	else {
		return res.json({
			message: "Please login first !",
			status: 401
		});
	}
}