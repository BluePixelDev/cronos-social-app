import 'jsonwebtoken';

type User = {
	id: number
	username: string
	email: string
	role: string
}

declare global {
	namespace App {
		interface Error {
			message: string;
			errorId: string;
		}
		
		interface Locals {
			user: User | null
		}

		interface PageData 
		{
			isAuthenticated: boolean
			user: User | null
		}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module "jsonwebtoken" {
	export interface JwtPayload {
		id: number
		username: string
		email: string
		role: string
	}
}

export { };
