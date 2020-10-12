import { Request, Response } from "express";

export function IndexWelcome (req: Request, res: Response): Response {
	return res.json("Welcome to COMA-CMS API");
}