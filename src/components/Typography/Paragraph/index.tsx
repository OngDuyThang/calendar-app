import { type FC } from 'react'
import Typography, { TypographyProps } from 'components/Typography'

const Paragraph: FC<TypographyProps> = ({
    children,
    ...props
}) => {
    return (
        <Typography tag='p' {...props}>
            {children}
        </Typography>
    )
}

export default Paragraph
