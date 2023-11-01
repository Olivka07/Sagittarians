import axios from "axios"
import { DataServerUser, apiInstance } from "../base"
import {IUserDto, LoginParams, ROLES, RegistrationParams} from './models'
import { API_URL } from "shared/config"



export const login = async(
    params: LoginParams
): Promise<IUserDto> => {
    const {user, accessToken, refreshToken} = await apiInstance.post<DataServerUser>('/auth/login', params)
    console.log(user, accessToken, [98,63,64],refreshToken)
    localStorage.setItem('refresh_token', refreshToken)
    localStorage.setItem('token', accessToken)
    localStorage.setItem('role', user.user_role)
    return user
}

export const checkAuth = async ():Promise<IUserDto> => {
    const refreshToken = localStorage.getItem('refresh_token')
    const {data} = await axios.get<DataServerUser>(`${API_URL}/auth/refresh?refresh_token=${refreshToken}`, {withCredentials: true})
    localStorage.setItem('refresh_token', data.refreshToken)
    localStorage.setItem('token', data.accessToken)
    return data.user
}

export const logout = async(): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh_token')
    await apiInstance.post(`/auth/logout?refresh_token=${refreshToken}`, {})
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('refresh_token')
}

export const registration = async(
    params: RegistrationParams
): Promise<IUserDto> => {  
    const {user, accessToken, refreshToken} = await apiInstance.post<DataServerUser>('/auth/registration', params)
    if (user.user_role!==ROLES.SELLER) {
        localStorage.setItem('token', accessToken)
        localStorage.setItem('role', user.user_role)
        localStorage.setItem('refresh_token', refreshToken)
    }
    return user
}

// export const getSellers = async (): Promise<IUserDto[]> => {
//     return apiInstance.get(`/users?role=${ROLES.SELLER}`)
// }

export const getSellers = async (): Promise<IUserDto[]> => {
    return apiInstance.get(`/sellers`)
}

export const deleteSeller = async (id_user:number): Promise<number> => {
    return apiInstance.delete(`/users?id_user=${id_user}`)
}