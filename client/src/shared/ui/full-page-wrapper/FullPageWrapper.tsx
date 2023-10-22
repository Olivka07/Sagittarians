import { FC, PropsWithChildren } from 'react'
import './full-page-wrapper.css'

export const FullPageWrapper: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className='wrapper'>
            {children}
        </div>
    )
}