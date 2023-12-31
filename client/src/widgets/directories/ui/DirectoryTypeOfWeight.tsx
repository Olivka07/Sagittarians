import { useGate, useStore } from 'effector-react';
import { $typesOfWeight, GateTypesOfWeight, fetchAddTypesOfWeightProductFx, fetchDeleteTypesOfWeightProductFx, fetchUpdateTypesOfWeightProductFx } from 'entities/product/model/store';
import React, { useEffect } from 'react';
import { Directory } from 'shared/ui/directory';
import { DataType } from 'shared/ui/directory/ui/Directory';

export const DirectoryTypeOfWeight = () => {
    useGate(GateTypesOfWeight)

    const typesOfWeight = useStore($typesOfWeight)

    const update = async (params: DataType[]) => {
        await fetchUpdateTypesOfWeightProductFx({
            updateTypes: params.map((el) => ({name_type: el.name, id_type: el.id}))
        })
    }

    const add = async (params: DataType[]) => {
        await fetchAddTypesOfWeightProductFx({
            addTypes: params.map((el) => ({name_type: el.name, id_type: el.id}))
        })
    }

    const deleteTypes = async (params: DataType[]) => {
        await fetchDeleteTypesOfWeightProductFx({
            deleteTypes: params.map((el) => ({name_type: el.name, id_type: el.id}))
        })
    }

    if (typesOfWeight)
        return (
            <Directory 
                addInDirectoryApi={add}
                deleteFromDirectoryApi={deleteTypes}
                updateInDirectoryApi={update}
                key={'DirectoryTypeOfWeight'} 
                title='Размерность' data={typesOfWeight.map((el) => {
                return {
                    name: el.name_type,
                    id: el.id_type
                }
            })}/>
        );
    else return null
};

