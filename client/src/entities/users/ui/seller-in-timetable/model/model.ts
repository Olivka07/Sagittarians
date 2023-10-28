import { IUserDto } from "shared/api/users/models"

export interface ISellerDto extends IUserDto {
    timeStart?: string
    timeEnd?: string
}

export interface ICeil {
    id: number
    date?: number
    sellers: ISellerDto[]
}