import { Article, Div, Space, Title, Text, Image } from 'components'
import { COLOR } from 'utils/constants'
import { type FC } from 'react'
import { GoDeviceCameraVideo } from "react-icons/go";

const Card: FC = () => {
    const Appointment = (
        <Div flex justify='between'>
            <Space size={8} direct='vertical'>
                <Title level={3} fontSize='1rem' fontWeight={500} color={COLOR.DARK_BLUE}>
                    First Session with Alex Stan
                </Title>
                <Text fontSize='0.8rem' fontWeight={500} color={COLOR.GREY_TEXT}>
                    9:00 AM - 9:30 AM GMT +8
                </Text>
            </Space>
            <GoDeviceCameraVideo className='w-8 h-8' />
        </Div>
    )

    const User = (
        <Space size={8} center>
            <Image src='/user.png' alt='avatar' hasFrame width='30px' height='30px' />
            <Text fontSize='1rem' fontWeight={500} color={COLOR.GREY_TEXT}>
                View Client Profile
            </Text>
        </Space>
    )

    return (
        <Article
            flex direct='column' gap='16px'
            className='p-4 rounded'
            style={{ border: '2px solid red' }}
        >
            {Appointment}
            {User}
        </Article>
    )
}

export default Card
