import { Article, Div, Space, Title, Text, Image } from 'components'
import { COLOR } from 'utils/constants'
import { type FC } from 'react'
import { GoDeviceCameraVideo } from "react-icons/go";
import styles from './index.module.scss'

interface IProps {
    title: string;
    time: string;
    clients: string[];
}

const Card: FC<IProps> = ({
    title,
    time,
    clients
}) => {
    const Appointment = (
        <Div flex justify='between'>
            <Space size={8} direct='vertical'>
                <Title level={3} fontSize='1rem' fontWeight={500} color={COLOR.DARK_BLUE}>
                    {title}
                </Title>
                <Text fontSize='0.8rem' fontWeight={500} color={COLOR.GREY_TEXT}>
                    {time} GMT +8
                </Text>
            </Space>
            <GoDeviceCameraVideo className='w-8 h-8' />
        </Div>
    )

    const User = (
        <Space size={8} center>
            <Image src='/user.png' alt='avatar' hasFrame width='30px' height='30px' />
            <Text fontSize='1rem' fontWeight={500} color={COLOR.GREY_TEXT}>
                {clients[0]}
            </Text>
        </Space>
    )

    return (
        <Article
            flex direct='column' gap='16px'
            className={styles.root}
        >
            {Appointment}
            {User}
        </Article>
    )
}

export default Card
