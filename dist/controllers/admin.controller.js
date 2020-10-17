"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoamiAdmin = exports.LogoutAdmin = exports.LoginAdmin = exports.DeleteAdmin = exports.UpdateAdmin = exports.CreateAdmin = exports.IndexAdmin = void 0;
const database_1 = require("../database");
// Encryptor
const bcrypt_1 = __importDefault(require("bcrypt"));
// Validators
const validations_1 = require("../validations/validations");
function IndexAdmin(req, res) {
    return res.json("COMA-CMS | ADMINS");
}
exports.IndexAdmin = IndexAdmin;
function CreateAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const registerCheck = yield validations_1.registerValidation(req.body);
        if (registerCheck !== true) {
            return res.json({
                message: registerCheck.details[0].message,
                status: 400,
                registerCheck
            });
        }
        if (validations_1.checkSuperUser(req.body.super_password)) {
            try {
                const conn = yield database_1.connect();
                const result = yield conn.query("SELECT * FROM admins WHERE email = ?", [req.body.email]);
                if (Object.values(result[0]).length > 0) {
                    return res.json({
                        message: "Forbidden",
                        status: 401
                    });
                }
                else {
                    // HASH THE PASSWORD
                    const password = yield bcrypt_1.default.hash(req.body.password, 10);
                    // CONSTRUCT THE NEW OBJECT FOR ADMIN
                    const newAdmin = {
                        name: req.body.name,
                        email: req.body.email,
                        password: password,
                        role: req.body.role,
                    };
                    yield conn.query("INSERT INTO admins SET ?", [newAdmin]);
                    return res.json({
                        message: "Admin created successfully",
                        status: 200,
                    });
                }
            }
            catch (error) {
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
    });
}
exports.CreateAdmin = CreateAdmin;
function UpdateAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validations_1.checkSuperUser(req.body.super_password)) {
            try {
                const id = req.body.id;
                // HASH THE PASSWORD
                const password = yield bcrypt_1.default.hash(req.body.password, 10);
                // CONSTRUCT THE NEW OBJECT FOR ADMIN
                const updatedAdmin = {
                    name: req.body.name,
                    email: req.body.email,
                    password: password,
                    role: req.body.role
                };
                const conn = yield database_1.connect();
                yield conn.query("UPDATE admins SET ? WHERE id = ?", [updatedAdmin, id]);
                return res.json({
                    message: "Admin updated successfully",
                    status: 200,
                });
            }
            catch (error) {
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
    });
}
exports.UpdateAdmin = UpdateAdmin;
function DeleteAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validations_1.checkSuperUser(req.body.super_password)) {
            try {
                const id = req.body.id;
                const conn = yield database_1.connect();
                yield conn.query("DELETE FROM admins WHERE id = ?", [id]);
                return res.json({
                    message: "Admin deleted successfully",
                    status: 200
                });
            }
            catch (error) {
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
    });
}
exports.DeleteAdmin = DeleteAdmin;
function LoginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validations_1.checkIfAdminIsLoggedIn(req.session)) {
            return res.json({
                message: "You are already logged in",
                status: 200
            });
        }
        try {
            const conn = yield database_1.connect();
            const storedAdmin = yield conn.query("SELECT * FROM admins WHERE email = ? LIMIT 1", [req.body.email]);
            if (Object.values(storedAdmin[0]).length > 0) {
                const currentAdmin = Object.values(storedAdmin[0])[0];
                const passwordToCompare = currentAdmin.password;
                const isThePasswordCorrect = bcrypt_1.default.compare(passwordToCompare, req.body.password);
                if (isThePasswordCorrect) {
                    req.session.adminLogged = {
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
                    });
                }
            }
            else {
                return res.json({
                    message: "There is an error with server, please try again later 1",
                    status: 500,
                });
            }
        }
        catch (error) {
            return res.json({
                error,
                message: "There is an error with server, please try again later 2",
                status: 500
            });
        }
    });
}
exports.LoginAdmin = LoginAdmin;
function LogoutAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validations_1.checkIfAdminIsLoggedIn(req.session)) {
            delete req.session.adminLogged;
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
    });
}
exports.LogoutAdmin = LogoutAdmin;
function WhoamiAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validations_1.checkIfAdminIsLoggedIn(req.session)) {
            return res.json({
                iam: req.session.adminLogged,
                status: 200
            });
        }
        else {
            return res.json({
                message: "Please login first !",
                status: 401
            });
        }
    });
}
exports.WhoamiAdmin = WhoamiAdmin;
