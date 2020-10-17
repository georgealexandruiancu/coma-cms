import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { connect } from "../database";
import { Navigation } from "../interface/Navigation";

// Validators
import { checkIfAdminIsLoggedIn } from "../validations/validations";

export async function CreateNavigation (req: Request, res: Response): Promise<Response> {
	if (checkIfAdminIsLoggedIn(req.session)) {

		try {
			const newNavigation:Navigation = {
				title: req.body.title,
				route: req.body.route,
				order_num: req.body.order_num ? req.body.order_num : 0,
				updated_by: req!.session!.adminLogged.email,
				main_category: req.body.main_category ? req.body.main_category : 0,
				is_active: req.body.is_active ? req.body.is_active : 0
			}

			const conn = await connect();

			const result:any = await conn.query("INSERT INTO navigation SET ?", [newNavigation]);

			if (result[0].affectedRows > 0) {
				return res.json({
					message: "Navigation updated successfully",
					status: 200
				})
			}
			else {
				return res.json({
					message: "There is an error with server, please try again later",
					status: 500
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
			message: "Please login first !",
			status: 401
		});
	}
}

export async function UpdateNavigation (req: Request, res: Response): Promise<Response> {
	if (checkIfAdminIsLoggedIn(req.session)) {
		try {
			const idNavigation = req.body.id;

			const newNavigation:Navigation = {
				title: req.body.title,
				route: req.body.route,
				order_num: req.body.order_num ? req.body.order_num : 0,
				updated_by: req!.session!.adminLogged.email,
				main_category: req.body.main_category ? req.body.main_category : 0,
				is_active: req.body.is_active ? req.body.is_active : 0
			}

			const conn = await connect();

			const result:any = await conn.query("UPDATE navigation SET ?, updated_date=now() WHERE id = ?", [newNavigation, idNavigation]);

			if (result[0].affectedRows > 0) {
				return res.json({
					message: "Navigation updated successfully",
					status: 200
				})
			}
			else {
				return res.json({
					message: "There is an error with server, please try again later",
					status: 500
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
			message: "Please login first !",
			status: 401
		});
	}
}

export async function DeleteNavigation (req: Request, res: Response): Promise<Response> {
	if (checkIfAdminIsLoggedIn(req.session)) {
		const idNavigation = req.body.id

		try {
			const conn = await connect();
			const result:any = await conn.query("DELETE FROM navigation WHERE id = ?", [idNavigation]);
			if (result[0].affectedRows > 0) {
				return res.json({
					message: "Navigation deleted successfully",
					status: 200
				});
			}
			else {
				return res.json({
					message: "There is an error with server, please try again later",
					status: 500
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
			message: "Please login first !",
			status: 401
		});
	}
}

export async function GetNavigation (req: Request, res: Response): Promise<Response> {
	return res.json({
		message: "to be done"
	});
}