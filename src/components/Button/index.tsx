import clsx from 'clsx'
import { CSSProperties, ComponentPropsWithoutRef, type FC } from 'react'
import { Require } from 'types/common'
import styles from './index.module.scss'

interface ButtonProps extends Require<
    ComponentPropsWithoutRef<'button'>,
    'children'
> {}

interface IProps extends ButtonProps {
    variant?: 'default' | 'outline',
    background?: string;
    fontSize?: string;
    fontWeight?: string;
    borderRadius?: string
}

const Button: FC<IProps> = ({
    children,
    className,
    style,
    prefix,
    onClick,
    variant = 'default',
    background,
    fontSize = '0.8rem',
    fontWeight = '500',
    borderRadius = '0.5rem',
    ...props
}) => {
    const inlineStyle: CSSProperties = {
        height: 'fit-content',
        background,
        fontSize,
        fontWeight,
        borderRadius,
        ...style
    }

    return (
        <button
            className={clsx(
                'py-3 px-4',
                styles[variant],
                className
            )}
            style={inlineStyle}
            prefix={prefix}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
