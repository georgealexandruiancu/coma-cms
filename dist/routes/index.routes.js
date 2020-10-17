"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// =====================
// -- CONTROLLERS
// =====================
const index_controller_1 = require("../controllers/index.controller");
router.route("/")
    .get(index_controller_1.IndexWelcome);
exports.default = router;
