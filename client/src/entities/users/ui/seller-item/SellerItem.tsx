import { Card, Col, Row } from 'antd';
import React, { FC, PropsWithChildren } from 'react';
import { IUserDto } from 'shared/api/users/models';
import './seller-item.css'
import { Button } from 'shared/ui/button';


interface SellerItemProps extends PropsWithChildren {
    seller: IUserDto
}
export const SellerItem:FC<SellerItemProps> = ({seller, children}) => {
    return (
        <Card
            className='seller-item__container'
            type="inner"
            title={`${seller.surname} ${seller.name}`}
        >
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <div className='seller-item__meta'>{`Дата рождения: ${seller.birthdate}`}</div>
                    <div className='seller-item__meta'>{`Рабочий логин: ${seller.login}`}</div>
                </Col>
                <Col>{children}</Col>
            </Row>
        </Card>
    );
};

