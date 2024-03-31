import { type FC } from 'react'
import Container, { ContainerProps } from 'components/Container'

const Section: FC<ContainerProps> = ({
    children,
    ...props
}) => {
    return (
        <Container tag='section' {...props}>
            {children}
        </Container>
    )
}

export default Section
