import React, { FC } from 'react';
import {Button} from 'shared/ui/button'

interface CreateNewProductBtnProps {
    onClick: () =>void
}
export const CreateNewProductBtn:FC<CreateNewProductBtnProps> = ({onClick}) => {
    return (
        <Button
            style={{
                position: 'absolute',
                marginLeft: '-10px',
                height: 'auto',
                padding: '5px',
            }} 
            text='➕' 
            onClick={onClick}
        />
    );
};

