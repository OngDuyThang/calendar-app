import clsx from 'clsx';
import { CSSProperties, useState, type FC } from 'react'

interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    hasFrame?: boolean;
    fit?: 'contain' | 'cover' | 'fill';
    lazy?: boolean;
    className?: string;
    style?: CSSProperties;
    srcXS?: string;
    srcSM?: string;
    srcMD?: string;
    srcLG?: string;
    srcXL?: string;
    srcXXL?: string;
}

const Image: FC<ImageProps> = ({
    src,
    alt,
    width = '100%',
    height = '100%',
    hasFrame = false,
    fit,
    lazy = false,
    className,
    style,
    srcXS = src,
    srcSM = src,
    srcMD = src,
    srcLG = src,
    srcXL = src,
    srcXXL,
}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const imgSrc = loading || error ? '/placeholder.png' : src

    const inlineStyle: CSSProperties = {
        objectFit: fit,
        ...style
    }

    const WithFrame = (
        <div
            className={clsx(
                'overflow-hidden rounded-full',
                className
            )}
            style={{ width, height }}
        >
            <picture>
                <source media='(min-width: 480px)' srcSet={srcXS} />
                <source media='(min-width: 576px)' srcSet={srcSM} />
                <source media='(min-width: 768px)' srcSet={srcMD} />
                <source media='(min-width: 992px)' srcSet={srcLG} />
                <source media='(min-width: 1200px)' srcSet={srcXL} />
                <source media='(min-width: 1600px)' srcSet={srcXXL} />
                <img
                    src={imgSrc} alt={alt}
                    width='100%' height='100%'
                    style={inlineStyle}
                    {...(lazy && { loading: 'lazy' })}
                    onLoad={() => setLoading(false)}
                    onError={() => setError(true)}
                />
            </picture>
        </div>
    )

    const WithoutFrame = (
        <picture>
            <source media='(min-width: 480px)' srcSet={srcXS} />
            <source media='(min-width: 576px)' srcSet={srcSM} />
            <source media='(min-width: 768px)' srcSet={srcMD} />
            <source media='(min-width: 992px)' srcSet={srcLG} />
            <source media='(min-width: 1200px)' srcSet={srcXL} />
            <source media='(min-width: 1600px)' srcSet={srcXXL} />
            <img
                src={imgSrc} alt={alt}
                width={width} height={height}
                className={className}
                style={inlineStyle}
                {...(lazy && { loading: 'lazy' })}
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
            />
        </picture>
    )

    if (hasFrame) return WithFrame
    return WithoutFrame
}

export default Image
