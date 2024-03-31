import { type FC } from 'react'
import Container, { ContainerProps } from 'components/Container'

const Div: FC<ContainerProps> = ({
    children,
    ...props
}) => {
    return (
        <Container tag='div' {...props}>
            {children}
        </Container>
    )
}

export default Div
