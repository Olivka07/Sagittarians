import { 
    AddProductInCatalogButton, 
    CreateNewProductBtn, 
    ChangeProductInCatalogButton, 
    TitleInput, 
    PriceInput, 
    MeasuringSelect,
    CategorySelect,
    CountInput,
    PictureInput,
    ChangeProductBtn
} from 'features/work-with-product';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { ModalWindow } from 'shared/ui/modal';
import {Form} from 'antd'
import {Button} from 'shared/ui/button'
import { useForm } from 'antd/es/form/Form'
import { useModal } from 'shared/lib/hooks/modal.hook';
import Message from 'shared/ui/message/Message';
import { IProduct } from 'shared/api/products/models';
import { useStore } from 'effector-react';
import { $auth } from 'entities/auth/store/auth.store';
import { ROLES } from 'shared/api/users/models';
import { $loading } from 'entities/product/model/store';
import { Spinner } from 'shared/ui/spinner';


interface WorkProductModalProps {
    work: 'change' | 'add'
    product?: IProduct
    changeConfirm?: () => void
}
export const WorkProductModal: FC<WorkProductModalProps> = ({work, product}) => {
    const auth = useStore($auth)
    const [form] = useForm()
    const {modal, toggle} = useModal()
    const [modalProduct, setModalProduct] = useState<boolean>(false)
    const loading = useStore($loading)

    useEffect(() => {
        if (product && modalProduct) {
            form.setFieldsValue({
                title_product: product.title_product,
                price_product: product.price_product,
                type_product: product.type_product,
                count_product: product.count_product,
                name_type: product.name_type,
                path_image_product: product.path_image_product
            })
        }
    }, [modalProduct])

    const changeModal = () => {
        form.resetFields()
        setModalProduct(prev => !prev)
    }

    const buttons = useMemo(() => {
        if (work === 'add') {
            return [
                <AddProductInCatalogButton close={changeModal} toggle={toggle} form={form} key={'Добавление в каталог'}/>
            ]
        }else if (product) {
            return [
                <ChangeProductInCatalogButton product={product} close={changeModal} toggle={toggle} form={form} key={'Изменение в каталоге'}/>
            ]
        } else {
            return []
        }
    }, [product])

    if (auth === ROLES.ADMIN)
        return (
            <>
                {
                    modal && 
                    <Message>
                        {modal}
                    </Message>
                }
                {work === 'add' && <CreateNewProductBtn onClick={changeModal}/>}
                {work === 'change' && <ChangeProductBtn onClick={changeModal}/>}
                <ModalWindow
                    onCancel={() => {
                        changeModal()
                        form.resetFields()
                    }}
                    title={work === 'add'?'Добавление':'Изменение'}
                    open={modalProduct}
                    buttons={[
                        ...buttons,
                        <Button
                            className='add-or-update-product-in-catalog-btn'
                            key={'Закрыть'}
                            onClick={() => {
                                changeModal()
                                form.resetFields()
                            }}
                            style={{
                                gridColumn: '4/5'
                            }}
                            text='Закрыть'
                            htmlType='reset'
                        />
                    ]}
                >
                    <Form 
                        className='work-with-product__form form-auth-modal'
                        form={form}
                        name={`validateOnly${Date.now()}`}
                    >
                        {loading && <Spinner/>}
                        <TitleInput/>
                        <CategorySelect/>
                        <PriceInput/>
                        <MeasuringSelect/>
                        <CountInput form={form}/>
                        <PictureInput form={form}/>
                    </Form>
                </ModalWindow>
            </>
        )
    return <></>
};

