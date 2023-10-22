import React, {FC, PropsWithChildren} from 'react';
import './message.css'

const Message:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className='message__container'>
            {children}
        </div>
    );
};

export default Message;