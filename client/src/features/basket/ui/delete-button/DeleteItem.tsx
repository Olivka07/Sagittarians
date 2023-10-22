import React, { FC } from 'react';
import { Button } from 'shared/ui/button';

interface DeleteItemProps {
    className: string
    deleteBtn: () => void
}
const DeleteItem:FC<DeleteItemProps> = ({className, deleteBtn}) => {
    return (
        <Button
            text='Убрать из корзины' 
            className={className}
            onClick={deleteBtn}
        />
    );
};

export default DeleteItem;