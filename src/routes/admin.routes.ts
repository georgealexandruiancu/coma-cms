import { Router } from "express";

const router = Router();

// =====================
// -- CONTROLLERS
// =====================
import { CreateAdmin, DeleteAdmin, IndexAdmin, UpdateAdmin, LoginAdmin, LogoutAdmin } from "../controllers/admin.controller";

router.route("/")
	.get(IndexAdmin)
	.post(CreateAdmin)
	.put(UpdateAdmin)
	.delete(DeleteAdmin);

router.route("/login")
	.post(LoginAdmin);

router.route("/logout")
	.get(LogoutAdmin);

export default router;