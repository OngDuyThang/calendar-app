import { type FC, CSSProperties, ReactNode } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx';

interface SpaceProps {
    children: ReactNode;
    direct?: 'vertical' | 'horizontal';
    size: number;
    center?: boolean;
    wrap?: boolean;
    className?: string;
    style?: CSSProperties;
}

const Space: FC<SpaceProps> = ({
    children,
    direct = 'horizontal',
    size,
    center = false,
    wrap = false,
    className,
    style,
}) => {
    const inlineStyle: CSSProperties = {
        gap: `${size}px`,
        ...style
    }

    return (
        <div
            className={clsx(
                styles.root,
                styles[direct],
                center && styles[`center-${direct}`],
                wrap && styles.wrap,
                className
            )}
            style={inlineStyle}
        >
            {children}
        </div>
    )
}

export default Space
