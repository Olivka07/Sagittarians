import { useGate, useStore } from 'effector-react';
import { $typesProducts, fetchAddTypesProductFx, fetchDeleteTypesProductFx, fetchUpdateTypesProductFx, productsGate } from 'entities/product/model/store';
import React, { useEffect } from 'react';
import { IUpdateTypesProduct } from 'shared/api/products/models';
import { Directory } from 'shared/ui/directory';
import { DataType } from 'shared/ui/directory/ui/Directory';

export const DirectoryTypeProduct = () => {

    const typesProducts = useStore($typesProducts)

    const update = async(params: DataType[]) => {
        await fetchUpdateTypesProductFx({
            updateTypes: params.map((el) => ({type_product: el.name, id_type_product: el.id}))
        })
    }

    const add = async (params: DataType[]) => {
        await fetchAddTypesProductFx({
            addTypes: params.map((el) => ({type_product: el.name, id_type_product: el.id}))
        })
    }

    const deleteTypes = async (params: DataType[]) => {
        await fetchDeleteTypesProductFx({
            deleteTypes: params.map((el) => ({type_product: el.name, id_type_product: el.id}))
        })
    }

    
    return (
        <Directory 
            addInDirectoryApi={add}
            deleteFromDirectoryApi={deleteTypes}
            updateInDirectoryApi={update} 
            key={'DirectoryTypeProduct'} 
            title='Категория' 
            data={typesProducts.map((el) => {
            return {
                name: el.type_product,
                id: el.id_type_product
            }
        })}/>
    );
};

