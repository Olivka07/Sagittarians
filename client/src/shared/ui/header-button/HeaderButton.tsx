import React, {FC, PropsWithChildren, MouseEventHandler} from 'react';
import {Link} from 'react-router-dom'
import './header-button.css'

interface HeaderButtonProps extends PropsWithChildren {
    onClick?: MouseEventHandler,
    to: string
}

export const HeaderButton:FC<HeaderButtonProps> = (props) => {
    const {children, ...propsComponent} = props
    if (propsComponent.to) {
        return (
            <Link 
                {...propsComponent}
                className='header__button'
            >
                { children }
            </Link>
        );
    } else {
        return <div {...propsComponent} className='header__button'>{ children }</div>
    }
    
};

