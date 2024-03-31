import { ReactNode, type FC, CSSProperties, ReactHTML } from 'react'
import clsx from 'clsx'
import styles from './index.module.scss'

type percent = '100' | '20' | '40' | '60' | '80' | '25' | '50' | '75' | '33' | '66'
type layout = 'start' | 'center' | 'end'
type justify = 'between' | 'evenly' | 'around'
type direction = 'row' | 'column' | 'row-reverse' | 'column-reverse'

export interface ContainerProps {
    children: ReactNode;
    width?: percent;
    height?: percent;
    flex?: boolean;
    direct?: direction;
    justify?: layout | justify;
    align?: layout;
    gap?: string;
    wrap?: boolean;
    className?: string;
    color?: string;
    background?: string;
    style?: CSSProperties;
    id?: string;
}

interface IProps extends ContainerProps {
    tag: keyof Pick<ReactHTML, 'div' | 'section' | 'article'>;
}

const Container: FC<IProps> = ({
    tag,
    children,
    width = '100',
    height,
    flex = false,
    direct = 'row',
    justify,
    align,
    gap,
    wrap = false,
    className,
    color,
    background,
    style,
    id,
    ...props
}) => {
    const inlineStyle: CSSProperties = {
        gap,
        color,
        background,
        ...style
    }

    const commonClass = clsx(
        styles[`width-${width}`],
        height && styles[`height-${height}`],
        flex && styles.flex,
        flex && styles[`direct-${direct}`],
        justify && styles[`justify-${justify}`],
        align && styles[`align-${align}`],
        wrap && styles.wrap,
        className
    )

    const Tag = tag

    return (
        <Tag
            className={commonClass}
            style={inlineStyle}
            id={id}
            {...props}
        >
            {children}
        </Tag>
    )
}

export default Container