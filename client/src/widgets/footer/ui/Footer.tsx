import { Col, Layout, Row } from 'antd';
import React from 'react';
import './footer.css'
const {Footer} = Layout

export const FooterPage = () => {
    return (
        <Footer className='footer'>
            <Row>
                <Col span={6}>
                    <Row className='footer__containermeta'>
                        <Col className='footer__meta'>Адрес:</Col>
                        <Col className='footer__metainfo'>
                            Россия, Самарская область, 
                            район Кошкинский, железнодорожная станция 
                            Погрузная, улица Школьная, дом №10
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Footer>
    );
};

