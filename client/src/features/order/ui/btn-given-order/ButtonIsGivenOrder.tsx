import React, { FC } from 'react';
import { Button } from 'shared/ui/button';
import './btn-is-given-order.css'
import { fetchUpdateIsGiven } from 'entities/order/model/store';

interface ButtonIsGivenOrderProps {
    updateIsGivenOrder: (e:React.MouseEvent) => void
}
export const ButtonIsGivenOrder:FC<ButtonIsGivenOrderProps> = ({updateIsGivenOrder}) => {

    return (
        <Button
            onClick={updateIsGivenOrder}
            text='Забрали'
            className='order-item-for-seller__btnisgiven'
        />
    );
};

