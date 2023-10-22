export interface IProduct {
    id_product: number
    title_product: string
    path_image_product: string
    price_product: number
    name_type: string
    type_product: string
    count_product: number
}

export interface IServerProducts {
    products: IProduct[]
}

export interface TypeProduct {
    type_product: string
    id_type_product: number
}

export interface TypeOfWeight {
    name_type: string
    id_type: number
}

export interface TypesProducts {
    typesProducts: Array<TypeProduct>
}

export interface IAddProduct {
    title_product: string
    path_image_product: string
    price_product: number
    name_type: string
    type_product: string
    count_product: number
}

export interface IAddTypesProduct {
    addTypes: TypeProduct[]
}

export interface IUpdateTypesProduct {
    updateTypes: TypeProduct[]
}

export interface IDeleteTypesProduct {
    deleteTypes: TypeProduct[]
}

export interface IAddTypesOfWeightProduct {
    addTypes: TypeOfWeight[]
}

export interface IUpdateTypesOfWeighProduct {
    updateTypes: TypeOfWeight[]
}

export interface IDeleteTypesOfWeighProduct {
    deleteTypes: TypeOfWeight[]
}