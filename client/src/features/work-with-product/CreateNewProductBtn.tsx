import React, { FC } from 'react';
import {Button} from 'shared/ui/button'
import './work_with_product.css'

interface CreateNewProductBtnProps {
    onClick: () =>void
}
export const CreateNewProductBtn:FC<CreateNewProductBtnProps> = ({onClick}) => {
    return (
        <Button
            className='createnewproductbtn'
            // style={{
            //     position: 'absolute',
            //     marginLeft: '-10px',
            //     height: 'auto',
            //     padding: '5px',
            // }} 
            text='➕' 
            onClick={onClick}
        />
    );
};

