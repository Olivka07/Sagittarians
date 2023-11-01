import React, { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui/button';
import type {FormInstance} from 'antd'
import {Form} from 'antd'
import { IProduct } from 'shared/api/products/models';
import { fetchUpdateProductFx } from 'entities/product/model/store';

interface ChangeProductInCatalogButton {
    form: FormInstance
    toggle: (value: string | null) => void
    close: () => void,
    product: IProduct
}
export const ChangeProductInCatalogButton:FC<ChangeProductInCatalogButton> = ({form, toggle, close, product}) => {
    const [filePath, setFilePath] = useState<string>('')
    const values = Form.useWatch([], form)

    const [disabled, setDisabled] = useState(true)

    const getStringPathImage = (file:any) => {
        let path = ''
        if (file) {
            const func = () => {
                path = reader.result as string // path - то, что хранится в БД
                const image = new Image()
                image.src = path
                image.onload = function() {
                    reader.removeEventListener("load", func)
                    setFilePath(path)
                }
                image.onerror = function() {
                    reader.removeEventListener("load", func)
                    toggle('Некорректная картинка')
                    throw new Error
                }
            }
            const reader = new FileReader()
            reader.addEventListener("load", func)
            reader.readAsDataURL(file)
        }
    }

    const clickChangeProduct = async() => {
        try {
            let pathImage = ''
            if (values.path_image_product) {
                if (values.path_image_product.fileList && values.path_image_product.fileList.length > 0) {
                    pathImage = filePath
                } else if (!values.path_image_product.fileList) {
                    pathImage = product.path_image_product
                }
            }
            const params: IProduct = {
                ...values,
                id_product: product.id_product,
                count_product: Number(String(values.count_product).replace(',', '.')),
                price_product: Number(String(values.price_product).replace(',', '.')),
                path_image_product: pathImage
            }
            await fetchUpdateProductFx(params)
            toggle(`Изменение товара ${params.title_product} в каталоге прошло успешно`)
            close()
        } catch (e) {
            toggle(`Произошла ошибка при изменении товара в каталоге`)
        }
        
    }


    useEffect(() => {
        if (values) {
            let changed = false
            for (let key of Object.keys(values)) {
                if (values[key] != product[key as keyof typeof product]) {
                    changed = true
                }
            }
            form.validateFields({validateOnly: true}).then(
                () => {
                    if (changed) {
                        setDisabled(false)
                    } else {
                        setDisabled(true)
                    }
                },
                () => {
                    setDisabled(true)
                },
            );
            if (values.path_image_product && values.path_image_product.fileList&& values.path_image_product.fileList.length>0) {
                getStringPathImage(values.path_image_product.file)
            }
        }
            
            
    }, [values])
    return (
        <Button
            disabled={disabled}
            style={{
                backgroundColor: 'black',
                color: 'white',
                gridColumn: '1/3',
                justifySelf: 'start',
            }}
            className='add-or-update-product-in-catalog-btn'
            onClick={clickChangeProduct}
            text='Изменить'
        />
    );
};

