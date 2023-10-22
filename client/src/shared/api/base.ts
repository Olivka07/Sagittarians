import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import { API_URL } from 'shared/config'
import { IUserDto } from './users/models'

export interface DataServerUser {
    refreshToken: string
    accessToken: string
    user: IUserDto
}

class ApiInstance {
    public axios: AxiosInstance
    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        this.axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
            return config
        })
        this.axios.interceptors.response.use((config) => {
            return config
        }, (async (error) => {
            const originalRequest = error.config
            if (error.response.status === 401 && error.config && !error.config._isRetry) {
                originalRequest._isRetry = true
                try {
                    const response = await axios.get<DataServerUser>(`${API_URL}/auth/refresh`, {withCredentials: true})
                    localStorage.setItem('token', response.data.accessToken)
                    return this.axios.request(originalRequest)
                } catch (e) {
                    console.log('Не авторизован')
                }
            } else {
                console.log('error', error)
                throw error
            }
        }))
    }

    async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.get(
                endpoint, 
                options
            ) 
            return response.data
        } catch (e) {
            throw e
        }
    }

    async post<T>(
        endpoint: string, 
        data: any,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const response = await this.axios.post(
                endpoint,
                data,
                options
            )
            return response.data
        } catch (e) {
            throw e
        }
    }

    async put<T>(
        endpoint: string, 
        data: any,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const response = await this.axios.put(
                endpoint,
                data,
                options
            )
            return response.data
        } catch (e) {
            throw e
        }
    }

    async delete<T>(
        endpoint: string, 
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const response = await this.axios.delete(
                endpoint,
                options
            )
            return response.data
        } catch (e) {
            throw e
        }
    }
}

export const apiInstance = new ApiInstance()