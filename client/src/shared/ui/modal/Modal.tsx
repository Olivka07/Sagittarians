import React, {FC, MouseEventHandler, PropsWithChildren, ReactNode} from 'react';
import {Modal} from 'antd'
import './modal.css'

interface ModalWindowProps extends PropsWithChildren {
    buttons: ReactNode[]
    open: boolean
    onCancel: MouseEventHandler
    title: string
}

export const ModalWindow:FC<ModalWindowProps> = ({children, buttons, ...props}) => {

    return (
        <Modal
                {...props}
                // onOk={handleOk}
                bodyStyle={{
                    textAlign: 'center',
                }}
                footer={[
                    ...buttons
                ]}
            >
                {children}
        </Modal>
    );
};