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

export default router;