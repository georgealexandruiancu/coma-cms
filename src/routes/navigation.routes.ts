import { Router } from "express";

const router = Router();

// =====================
// -- CONTROLLERS
// =====================
import { CreateNavigation, DeleteNavigation, GetNavigation, UpdateNavigation } from "../controllers/navigation.controller";

router.route("/")
	.post(CreateNavigation)
	.put(UpdateNavigation)
	.delete(DeleteNavigation)
	.get(GetNavigation);

export default router;