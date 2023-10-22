import React, {FC, PropsWithChildren} from 'react';
import {Layout} from 'antd'
import {styles} from 'shared/lib/styles'
import 'shared/main.css'

const {Content, Header} = Layout


export const LayoutPage:FC<PropsWithChildren> = ({children}) => {
    return (
        <Layout style={{backgroundColor: styles.backgroundColor, padding: '20px'}} className='layout'>
            {children}
        </Layout>
    );
};

