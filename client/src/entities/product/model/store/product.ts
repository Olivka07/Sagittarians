import { createEffect, createStore, createEvent, sample, forward} from "effector";
import {createGate} from 'effector-react'
import { IAddProduct, IAddTypesOfWeightProduct, IAddTypesProduct, IDeleteTypesOfWeighProduct, IDeleteTypesProduct, IProduct, IUpdateTypesOfWeighProduct, IUpdateTypesProduct, TypeOfWeight, TypeProduct } from "shared/api/products/models";
import {IGetProductListParams} from 'shared/api/products/products'
import { productsApi, typesOfWeightProductsApi, typesProductsApi } from "shared/api";
import { debounce } from "patronum";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const DEBOUNCE_TIME = 600 
const LIMIT = 10

// const params: IGetProductListParams = {
//     limit: 10,
//     title: ''
// }

export const fetchListTypesProducts = createEffect('Fetch list typesproducts', {
    handler: async() => {
        try {
            const typesProducts = await typesProductsApi.getTypesProducts()
            return typesProducts
        } catch(e) {
            throw e
        }
    }
})

export const fetchUpdateTypesProductFx = createEffect('fetch update type product', {
    handler: async(params: IUpdateTypesProduct) => {
        const candidate = await typesProductsApi.updateTypesProducts(params)
        return candidate
    }
})

export const fetchAddTypesProductFx = createEffect('fetch add type product', {
    handler: async(params: IAddTypesProduct) => {
        const candidate = await typesProductsApi.addTypesProducts(params)
        return candidate
    }
})

export const fetchDeleteTypesProductFx = createEffect('fetch delete type product', {
    handler: async(params: IDeleteTypesProduct) => {
        const candidate = await typesProductsApi.deleteTypesProducts(params)
        return candidate
    }
})



export const $typesProducts = createStore<TypeProduct[]>([])
    .on(fetchListTypesProducts.doneData, (_, payload) => {
        return payload
    })
    .on(fetchUpdateTypesProductFx.doneData, (_, payload) => {
        return payload
    })
    .on(fetchAddTypesProductFx.doneData, (_, payload) => {
        return payload
    })
    .on(fetchDeleteTypesProductFx.doneData, (_, payload) => {
        return payload
    })


// Создаем эффект, который запрашивает продукты с сервера при запуске приложения
// и изменении поисковой строки
export const fetchProductListFx = createEffect('Fetch list products', {
    handler: async(params: IGetProductListParams) => {
        try {
            const productsList = await productsApi.getProductList(params)
            return productsList
        } catch (e) {
            throw e
        }
    } 
})

export const fetchAddNewProductFx = createEffect('Fetch add new product', {
    handler: async(params: IAddProduct) => {
        const candidate = await productsApi.addNewProduct(params)
        return candidate
    }
})

export const fetchDeleteProductFromCataloFx = createEffect('Delelte product from catalog', {
    handler: async(id_product:number) => {
        const candidate = await productsApi.deleteProductFromCatalog(id_product)
        return candidate
    }
})

export const fetchUpdateProductFx = createEffect('Update product', {
    handler: async (product: IProduct) => {
        const candidate = await productsApi.updateProductInCatalog(product)
        return candidate
    }
})

sample({
    clock: $typesProducts,
    fn: () => ({}),
    target: fetchProductListFx
})


export const productsGate = createGate('Gate to products')
forward({
    from: productsGate.open,
    to: fetchListTypesProducts
})


// Создаем event для изменения состояния строки
export const searchChanges = createEvent<string>()

// Создаем хранилище для строки и подписываемся на вышеопределённый event
export const $search = createStore<string>('')
    .on(searchChanges, (_, payload) => payload)

// Создаем event, который будет хранить результат последнего event
// переданного в source при условии, что пользователь
// в течение времени, указанного в timeout не вызывает данный event
export const debounceSearchChanged = debounce({
    source: searchChanges,
    timeout: DEBOUNCE_TIME
})

// Создаем хранилище для хранения значения из вышеопределённого event
export const $debouncedValue = createStore<string>('')

// После вызова функции, указанной в clock
// в хранилище, указанное в квдратных скобках,
// записываем результат этой функции
sample({
    clock: debounceSearchChanged,
    target: [$debouncedValue]
})


// Эффект для асинхронного запроса за одним продуктом
export const fetchProductFx = createEffect('Fetch one product', {
    handler: async(id: number) => {
        try {
            const candidate = await productsApi.getProductById(id)
            return candidate
        } catch(e) {
            throw e
        }
    }
})

export const Gate = createGate<number>()
forward({
    from: Gate.open,
    to: fetchProductFx
})

export const $loadPending = fetchProductListFx.pending 

// Хранилище, которое хранит информацию о загрузке данных с сервера
export const $pending = createStore<boolean>(false)
    .on(debounceSearchChanged, () => true)
    .on(fetchProductListFx.doneData, () => false)
    .on(fetchProductListFx.failData, () => false)
    .on(fetchProductFx, () => true)
    .on(fetchProductFx.doneData, () => false)



// Создаём хранилище для списка продуктов, который подписан на получение
// данных с сервера
export const $productList = createStore<IProduct[]>([])
    .on(fetchProductListFx.doneData, (state, payload) => {
        return [...payload]
    })
    .on(fetchAddNewProductFx.doneData, (state, payload) => {
        return [...state, payload]
    })
    .on(fetchDeleteProductFromCataloFx.doneData, (state, payload) => {
        return [...state.filter((product) => product.id_product !== payload)]
    })
    .on(fetchUpdateProductFx.doneData, (state, payload) => {
        return [...state.map((product) => {
            if (product.id_product === payload.id_product) {
                return payload
            }
            return product
        })]
    })
    .on(fetchProductListFx.failData, () => {
        return []
    })





export const changeProductToNull = createEvent()
export const $product = createStore<IProduct | null>(null)
    .on(fetchProductFx.doneData, (_, payload) => {
        return payload
    })
    .on(fetchProductFx.failData, () => null)
    .on(changeProductToNull, () => {
        return null
    })


    //asd
export const changeFilters = createEvent<CheckboxValueType[]>()
export const $filters = createStore<CheckboxValueType[]>([])
    .on(changeFilters, (_, payload) => {
        if (payload) {
            return payload
        } else {
            return []
        }
    })
if ($typesProducts) {
    sample({
        clock: $typesProducts,
        fn: (typesProducts) => typesProducts.map((el) => el.type_product),
        target: changeFilters
    })
}


const debouceChangeFilters = debounce({
    source: changeFilters,
    timeout: DEBOUNCE_TIME
})

export const $debounceFilters = createStore<CheckboxValueType[]>([])

sample({
    clock: debouceChangeFilters,
    target: [$debounceFilters]
})

sample({
    clock: $debounceFilters,
    source: $debouncedValue,
    fn: (search, filters) => ({title: search, filters: filters}),
    target: fetchProductListFx
})

// После изменения значения хранилища, указанного в clock
// вызывается функция, указанная в target с параметрами 
// возвращёнными в функции fn, которая в свою очередь
// принимает в качестве параметра значение из clock
sample({
    clock: $debouncedValue,
    source: $debounceFilters,
    fn: (filters, query) => ({filters:filters, title: query}),
    target: fetchProductListFx
})

export const fetchTypesOfWeight = createEffect('fetch types of weight', {
    handler: async() => {
        const types = await typesOfWeightProductsApi.getTypesOfWeight()
        return types
    }
})

export const fetchUpdateTypesOfWeightProductFx = createEffect('fetch update type of weight product', {
    handler: async(params: IUpdateTypesOfWeighProduct) => {
        const candidate = await typesOfWeightProductsApi.updateTypesOfWeightProducts(params)
        return candidate
    }
})

export const fetchAddTypesOfWeightProductFx = createEffect('fetch add type of weight product', {
    handler: async(params: IAddTypesOfWeightProduct) => {
        const candidate = await typesOfWeightProductsApi.addTypesOfWeightProducts(params)
        return candidate
    }
})

export const fetchDeleteTypesOfWeightProductFx = createEffect('fetch delete type of weight product', {
    handler: async(params: IDeleteTypesOfWeighProduct) => {
        const candidate = await typesOfWeightProductsApi.deleteTypesOfWeightProducts(params)
        return candidate
    }
})

export const $typesOfWeight = createStore<TypeOfWeight[] | null>(null)
    .on(fetchTypesOfWeight.doneData, (_, payload) => {
        return payload
    })
    .on(fetchAddTypesOfWeightProductFx.doneData, (_, payload) => {
        return payload
    })
    .on(fetchUpdateTypesOfWeightProductFx.doneData, (_, payload) => {
        return payload
    })
    .on(fetchDeleteTypesOfWeightProductFx.doneData, (_, payload) => {
        return payload
    })

export const GateTypesOfWeight = createGate()
forward({
    from: GateTypesOfWeight.open,
    to: fetchTypesOfWeight
})


