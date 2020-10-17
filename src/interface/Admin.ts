export interface Admin {
	id?: number,
	name: string,
	email: string,
	password: string,
	role: AdminRole
}

enum AdminRole {
	Administrator,
	Moderator
}