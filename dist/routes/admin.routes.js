"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// =====================
// -- CONTROLLERS
// =====================
const admin_controller_1 = require("../controllers/admin.controller");
router.route("/")
    .get(admin_controller_1.IndexAdmin)
    .post(admin_controller_1.CreateAdmin)
    .put(admin_controller_1.UpdateAdmin)
    .delete(admin_controller_1.DeleteAdmin);
router.route("/login")
    .post(admin_controller_1.LoginAdmin);
router.route("/logout")
    .get(admin_controller_1.LogoutAdmin);
router.route("/whoami")
    .get(admin_controller_1.WhoamiAdmin);
exports.default = router;
