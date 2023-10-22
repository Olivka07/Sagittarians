import axios from "axios"
import { DataServerUser, apiInstance } from "../base"
import {IUserDto, LoginParams, RegistrationParams} from './models'
import { API_URL } from "shared/config"



export const login = async(
    params: LoginParams
): Promise<IUserDto> => {
    const {user, accessToken} = await apiInstance.post<DataServerUser>('/auth/login', params)
    localStorage.setItem('token', accessToken)
    localStorage.setItem('role', user.user_role)
    return user
}

export const checkAuth = async ():Promise<IUserDto> => {
    const {data} = await axios.get<DataServerUser>(`${API_URL}/auth/refresh`, {withCredentials: true})
    localStorage.setItem('token', data.accessToken)
    return data.user
}

export const logout = async(): Promise<void> => {
    await apiInstance.post('/auth/logout', {})
    localStorage.removeItem('token')
    localStorage.removeItem('role')
}

export const registration = async(
    params: RegistrationParams
): Promise<IUserDto> => {  
    const {user, accessToken} = await apiInstance.post<DataServerUser>('/auth/registration', params)
    localStorage.setItem('token', accessToken)
    localStorage.setItem('role', user.user_role)
    return user
}