import React, { FC } from 'react';
import {Button} from 'shared/ui/button'
import './work_with_product.css'

interface ChangeProductBtnProps {
    onClick: () =>void
}
export const ChangeProductBtn:FC<ChangeProductBtnProps> = ({onClick}) => {
    return (
        <Button
            className='changeproductbtn'
            // style={{
            //     position: 'absolute',
            //     top: 0,
            //     zIndex:1,
            //     backgroundColor: 'rgba(70, 203, 22, 0.397)',
            //     left: 0,
            //     transform: 'translate(50%, 10px)',
            // }} 
            text='&#9998;' 
            onClick={onClick}
        />
    );
};

