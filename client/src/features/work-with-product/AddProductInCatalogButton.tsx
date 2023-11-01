import React, { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui/button';
import type {FormInstance, UploadFile} from 'antd'
import {Form} from 'antd'
import { IAddProduct } from 'shared/api/products/models';
import { fetchAddNewProductFx } from 'entities/product/model/store';


interface AddProductInCatalogButtonProps {
    form: FormInstance
    toggle: (value: string | null) => void
    close: () => void
}
export const AddProductInCatalogButton:FC<AddProductInCatalogButtonProps> = ({form, toggle, close}) => {
    const [filePath, setFilePath] = useState<string>('')
    const values = Form.useWatch([], form)

    const [disabled, setDisabled] = useState(true)

    const getStringPathImage = (file:any) => {
        // console.log(file)
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

    const clickAddProduct = async() => {
        try {
            const params: IAddProduct = {
                ...values,
                count_product: Number(values.count_product.replace(',', '.')),
                price_product: Number(values.price_product.replace(',', '.')),
                path_image_product: values.path_image_product && values.path_image_product.fileList.length>0 ? filePath : ''
            }
            await fetchAddNewProductFx(params)
            toggle(`Добавление нового товара ${params.title_product} в каталог прошло успешно`)
            close()
        } catch (e) {
            console.log(e)
            toggle(`Произошла ошибка при добавлении товара в каталог`)
        }
        
    }


    useEffect(() => {
        if (values){
            form.validateFields({validateOnly: true}).then(
                () => {
                  setDisabled(false)
                },
                () => {
                  setDisabled(true)
                },
            );
            if (values.path_image_product && values.path_image_product.fileList.length>0) {
                getStringPathImage(values.path_image_product.file)
            }
        }
        
    }, [values])
    return (
        <Button
            className='add-or-update-product-in-catalog-btn'
            disabled={disabled}
            style={{
                backgroundColor: 'black',
                color: 'white',
                gridColumn: '1/3',
                justifySelf: 'start',
                padding: '0px 20px'
            }}
            onClick={clickAddProduct}
            text='Добавить'
        />
    );
};

