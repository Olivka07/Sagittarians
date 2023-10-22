export interface IUserDto {
    id_user:number
    name: string
    surname: string
    email: string
    login: string
    password: string
    linkactivated: string
    user_role: ROLES
}

export interface LoginParams {
    login: string
    password: string
}

export enum ROLES {
    ADMIN = 'Admin',
    SELLER = 'Seller',
    CLIENT = 'Client',
    NO_AUTHORIZED = 'NoAuthorized'
}

export interface RegistrationParams {
    login: string
    password: string
    email: string
    name: string
    user_role: ROLES
    surname: string
}