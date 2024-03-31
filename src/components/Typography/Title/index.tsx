import { type FC } from 'react'
import Typography, { TypographyProps } from 'components/Typography'

interface IProps extends TypographyProps {
    level: 1 | 2 | 3 | 4 | 5 | 6
}

const Title: FC<IProps> = ({
    children,
    level,
    ...props
}) => {
    return (
        <Typography tag={`h${level}`} {...props}>
            {children}
        </Typography>
    )
}

export default Title
