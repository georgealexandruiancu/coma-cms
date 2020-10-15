import { Router } from "express";

const router = Router();

// =====================
// -- CONTROLLERS
// =====================
import { CreateAdmin, DeleteAdmin, IndexAdmin, UpdateAdmin } from "../controllers/admin.controller";

router.route("/")
	.get(IndexAdmin)
	.post(CreateAdmin)
	.put(UpdateAdmin)
	.delete(DeleteAdmin);

// router.route("/login")
// 	.post(LoginAdmin);

export default router;