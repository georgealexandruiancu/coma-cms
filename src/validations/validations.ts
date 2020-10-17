import Joi from '@hapi/joi';
import { Admin } from '../interface/Admin';

export function checkSuperUser (password:string) {
	return process.env.SUPER_MASTER_PASSWORD === password;
};

export async function registerValidation (user:Admin) {

	const schema = Joi.object().keys({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	const { name, email, password } = user;

	try {
		const validation = await schema.validateAsync({ name, email, password });
		return true;
	}
	catch(error) {
		return error;
	}

};

export function checkIfAdminIsLoggedIn (session: any) {
	return session.adminLogged && session.adminLogged.loggedIn === true ? true : false;
}