import clsx from 'clsx';
import type { CSSProperties, FC, ReactHTML, ReactNode } from 'react';

import styles from './index.module.scss';

export interface TypographyProps {
    className?: string;
    fontSize?: string;
    color?: string;
    fontWeight?: string | number;
    center?: boolean;
    lineHeight?: string;
    textAlign?: string;
    textTransform?: string;
    textDecoration?: string;
    fontStyle?: string;
    notSelect?: boolean;
    opacity?: string;
    children: ReactNode;
    style?: CSSProperties;
    onClick?: () => void
}

type Tags = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface IProps extends TypographyProps {
    tag: keyof Pick<ReactHTML, Tags>
}

const Typography: FC<IProps> = ({
    tag,
    color,
    fontSize,
    fontWeight,
    center = false,
    lineHeight,
    textTransform,
    textAlign,
    textDecoration,
    fontStyle,
    notSelect = false,
    children,
    opacity,
    className,
    style,
    onClick
}) => {
    const truthyStyle = {
        textTransform,
        textAlign
    } as CSSProperties

    const inlineStyle: CSSProperties = {
        color,
        fontSize,
        fontWeight,
        lineHeight,
        textDecoration,
        fontStyle,
        opacity,
        ...(notSelect && { userSelect: 'none' }),
        ...truthyStyle,
        ...style
    };

    const Tag = tag

    return (
        <Tag
            className={clsx(
                styles[tag],
                center && styles.center,
                className
            )}
            onClick={onClick}
            style={inlineStyle}
        >
            {children}
        </Tag>
    )
};

export default Typography;
