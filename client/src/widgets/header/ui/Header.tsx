import {Layout} from 'antd'
import React, {FC, PropsWithChildren, MouseEventHandler, useMemo, useState} from 'react';
import {useStore} from 'effector-react'
import {styles} from 'shared/lib/styles'
import { HeaderButton } from 'shared/ui/header-button';
import {PATH_PAGE} from 'shared/lib/react-router'
import {authStore} from 'entities/auth/store'
import { modalStore } from 'entities/auth-modal/store';
import { ROLES } from 'shared/api/users/models';
import './header.css'
import { Button } from 'shared/ui/button';
import { Link } from 'react-router-dom';
import { useModal } from 'shared/lib/hooks/modal.hook';
import Message from 'shared/ui/message/Message';
import { $pending } from 'entities/auth/store/auth.store';
import { Spinner } from 'shared/ui/spinner';

const {Header} = Layout
interface IHeaderButtonProps {
    lable: string
    onClick: () => void
    modalContent?: FC
    to: string
} 


export const HeaderPage: FC<PropsWithChildren> = () => {
    const {$modal, modalChange} = modalStore
    const [mobileMenu, setMobileMenu] = useState(false)
    const loading = useStore($pending)
    const {$user, $auth, fetchLogoutFx} = authStore
    const auth = useStore($auth)
    const headerLable = useMemo(() => new Map<ROLES | false, Array<IHeaderButtonProps>> ([
        [ROLES.CLIENT, [
            {lable: 'Каталог', onClick: () => {}, to: PATH_PAGE.root},
            {lable: 'Корзина', onClick: () => {}, to: '/basket'},
            {lable: 'Заказы', onClick: () => {}, to: '/orders'},
            {lable: 'Выйти', onClick: () => fetchLogoutFx(), to: PATH_PAGE.root}
        ]],
        [ROLES.NO_AUTHORIZED, [
            {lable: 'Каталог', onClick: () => {}, to: PATH_PAGE.root},
            {lable: 'Войти', onClick: () => modalChange(), to: ''},
        ]],
        [ROLES.SELLER, [
            {lable: 'Каталог', onClick: () => {}, to: PATH_PAGE.root},
            {lable: 'Заказы', onClick: () => {}, to: '/ordersbyclients'},
            {lable: 'График', onClick: () => {}, to: '/timetable'},
            {lable: 'Выйти',  onClick: () => fetchLogoutFx(), to: PATH_PAGE.root},
        ]],
        [ROLES.ADMIN, [
            {lable: 'Каталог', onClick: () => {}, to: PATH_PAGE.root},
            {lable: 'Продавцы', onClick: () => {}, to: '/sellers'},
            {lable: 'Справочники', onClick: () => {}, to: '/directories'},
            {lable: 'Выйти',  onClick: () => fetchLogoutFx(), to: PATH_PAGE.root},
        ]],
    ]), [])

    const changeOpenningMenu = () => {
        setMobileMenu(prev => !prev)
    }


    return (
        <>
            {loading && <Spinner/>}
            <Header
                style={{
                    zIndex: 2,
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: styles.backgroundColor,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '20px',
                    boxShadow: '#aa9fd1 0px 0px 5px 2px'
                }}
            >
                <div className="header__logo">
                    <Link to={PATH_PAGE.root}>
                        <span>Стрельцы</span>
                        <img src='/assets/icon.jpg'/>
                    </Link>
                </div>
                <div className='header__container-with-header-buttons'>
                    {headerLable.get(auth)?.map(({lable, ...props}, index) => {
                        return (
                            <HeaderButton key={index} {...props}>
                                {lable.toUpperCase()}
                            </HeaderButton>
                        )
                    })}
                </div>
                <div onClick={changeOpenningMenu} className={`header__container-with-header-buttons-mobile ${mobileMenu? 'change' : ''}`}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className='header__mobile-menu'>
                    {mobileMenu && headerLable.get(auth)?.map(({lable, onClick, ...props}, index) => {
                            return (
                                <HeaderButton onClick={() => {
                                    onClick()
                                    changeOpenningMenu()
                                }} key={index} {...props}>
                                    {lable.toUpperCase()}
                                </HeaderButton>
                            )
                    })}
                </div>
                
            </Header>
        </>
    );
}
