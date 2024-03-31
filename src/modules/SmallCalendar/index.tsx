import { Article, Button, Div, Section, Space, Text, Title } from 'components'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { COLOR } from 'utils/constants'
import { CSSProperties, useState, type FC, useEffect } from 'react'
import Card from './Card'
import styles from './index.module.scss'
import Calendar from './Calendar';
import { TAppointment } from 'types/appointment';

const today = new Date()
const currentMonth = today.getMonth()
const setCurrentYear = today.getFullYear()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const SmallCalendar: FC = () => {
    const iconCss: CSSProperties = {
        cursor: 'pointer',
        color: COLOR.DARK_BLUE
    }
    const [month, setMonth] = useState<number>(currentMonth)
    const [year, setYear] = useState<number>(setCurrentYear)
    const [appointments, setAppointments] = useState<TAppointment[]>([])

    const next = () => {
        setMonth(month => {
            if (month < 11) {
                month += 1
            } else {
                setYear(year + 1)
                month = 0
            }
            return month
        })
    }

    const prev = () => {
        setMonth(month => {
            if (month > 0) {
                month -= 1
            } else {
                setYear(year - 1)
                month = 11
            }
            return month
        })
    }

    useEffect(() => console.log('month: ' + month, 'year: ' + year), [month, year])

    const CalendarRender = (
        <Article flex direct='column' align='center' gap='16px' className={styles.calendar} >
            <Space size={16} center>
                <FaAngleLeft
                    style={iconCss} className='w-5 h-5'
                    onClick={prev}
                />
                <Text fontSize='1rem' fontWeight={700} color={COLOR.DARK_BLUE} notSelect>
                    {months[month]} {year}
                </Text>
                <FaAngleRight
                    style={iconCss} className='w-5 h-5'
                    onClick={next}
                />
            </Space>
            <Calendar {...{
                month,
                year,
                setAppointments: (value: TAppointment[]) => setAppointments(value)
            }} />
        </Article>
    )

    const Events = (
        <Section flex direct='column' gap='16px' className={styles.events}>
            <Div flex justify='between'>
                <Space size={8} direct='vertical'>
                    <Title level={2} fontSize='1.25rem' fontWeight={700} color={COLOR.DARK_BLUE}>
                        Upcoming Events
                    </Title>
                    <Text fontSize='1rem' fontWeight={500} color={COLOR.GREY_TEXT}>
                        Today, 4 Apr
                    </Text>
                </Space>
                <Button>
                    View All
                </Button>
            </Div>

            {appointments.map((appointment, index) => (
                <Card />
            ))}
        </Section>
    )

    return (
        <Section
            width='40' flex direct='column' gap='16px'
            className={styles.root}
        >
            {CalendarRender}
            {Events}
        </Section>
    )
}

export default SmallCalendar
