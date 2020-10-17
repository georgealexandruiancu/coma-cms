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
exports.checkIfAdminIsLoggedIn = exports.registerValidation = exports.checkSuperUser = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
function checkSuperUser(password) {
    return process.env.SUPER_MASTER_PASSWORD === password;
}
exports.checkSuperUser = checkSuperUser;
;
function registerValidation(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            name: joi_1.default.string().min(6).required(),
            email: joi_1.default.string().min(6).required().email(),
            password: joi_1.default.string().min(6).required()
        });
        const { name, email, password } = user;
        try {
            const validation = yield schema.validateAsync({ name, email, password });
            return true;
        }
        catch (error) {
            return error;
        }
    });
}
exports.registerValidation = registerValidation;
;
function checkIfAdminIsLoggedIn(session) {
    return session.adminLogged && session.adminLogged.loggedIn === true ? true : false;
}
exports.checkIfAdminIsLoggedIn = checkIfAdminIsLoggedIn;
