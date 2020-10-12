import { Router } from "express";

const router = Router();

// =====================
// -- CONTROLLERS
// =====================
import { CreateAdmin, IndexAdmin } from "../controllers/admin.controller";

router.route("/")
	.get(IndexAdmin)
	.post(CreateAdmin);

export default router;