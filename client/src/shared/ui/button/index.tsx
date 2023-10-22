import {MouseEventHandler, FC, CSSProperties} from 'react'
import {Button as ButtonAntd} from 'antd'

interface ButtonProps {
    text: string
    onClick?: MouseEventHandler
    className?: string
    style?: CSSProperties,
    htmlType?: "button" | "submit" | "reset" | undefined
    disabled?: boolean
}

export const Button:FC<ButtonProps> = ({text, ...props}) => {
    return (
        <ButtonAntd {...props}>
            {text}
        </ButtonAntd>
    )
}