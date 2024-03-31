import { type FC } from 'react'
import Container, { ContainerProps } from 'components/Container'

const Article: FC<ContainerProps> = ({
    children,
    ...props
}) => {
    return (
        <Container tag='article' {...props}>
            {children}
        </Container>
    )
}

export default Article
