import { type FC } from 'react'
import Typography, { TypographyProps } from 'components/Typography'

const Text: FC<TypographyProps> = ({
    children,
    ...props
}) => {
    return (
        <Typography tag='span' {...props}>
            {children}
        </Typography>
    )
}

export default Text
