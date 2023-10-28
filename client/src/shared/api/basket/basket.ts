import { apiInstance } from "../base";
import { IBasketProduct, ICreateOrderAnswer } from "./models";

const BASE_URL = `/basket`

export const createOrder = async (
    basket: IBasketProduct[],
): Promise<ICreateOrderAnswer> => {
    const date = new Date()
    return apiInstance.post(`${BASE_URL}`, {basket: basket, date: date.toLocaleString('tr-TR')})
}