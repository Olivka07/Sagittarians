import React, { FC } from 'react';
import './btn-delete-seller.css'
import { Button } from 'shared/ui/button';
import { IUserDto } from 'shared/api/users/models';


interface ButtonDeleteSellerProps {
    onClick: (e:IUserDto) => void
    seller: IUserDto
}
const ButtonDeleteSeller:FC<ButtonDeleteSellerProps> = ({onClick, seller}) => {

    const clickDelete = () => {
        onClick(seller)
    }

    return (
        <Button
            onClick={clickDelete}
            className='seller-item__delete'
            text='Удалить'
        />
    );
};

export default ButtonDeleteSeller;