import {Layout} from 'antd'
import React, {FC, PropsWithChildren, MouseEventHandler, useMemo} from 'react';
import {useStore} from 'effector-react'
import {styles} from 'shared/lib/styles'
import { HeaderButton } from 'shared/ui/header-button';
import {PATH_PAGE} from 'shared/lib/react-router'
import {authStore} from 'entities/auth/store'
import { modalStore } from 'entities/auth-modal/store';
import { ROLES } from 'shared/api/users/models';

const {Header} = Layout

interface IHeaderButtonProps {
    lable: string
    onClick: MouseEventHandler
    modalContent?: FC
    to: string
} 


export const HeaderPage: FC<PropsWithChildren> = () => {
    const {$modal, modalChange} = modalStore
    const {$user, $auth, fetchLogoutFx} = authStore
    const modal = useStore($modal)
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


    return (
        <>
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
                    Логотип
                </div>
                <div>
                    {headerLable.get(auth)?.map(({lable, ...props}, index) => {
                        return (
                            <HeaderButton key={index} {...props}>
                                {lable.toUpperCase()}
                            </HeaderButton>
                        )
                    })}
                </div>
            </Header>
        </>
    );
}
