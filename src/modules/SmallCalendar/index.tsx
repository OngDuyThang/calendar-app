import { Article, Button, Div, Section, Space, Text, Title } from 'components'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { COLOR } from 'utils/constants'
import { CSSProperties, useState, type FC, useEffect } from 'react'
import Card from './Card'
import styles from './index.module.scss'
import Calendar from './Calendar';
import { TAppointment } from 'types/appointment';
import { dateId } from 'utils/helpers';

const today = new Date()
const currentMonth = today.getMonth()
const currentYear = today.getFullYear()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface IProps {
    globalMonth: number;
    globalYear: number
}

const SmallCalendar: FC<IProps> = ({
    globalMonth,
    globalYear
}) => {
    const iconCss: CSSProperties = {
        cursor: 'pointer',
        color: COLOR.DARK_BLUE
    }
    const [day, setDay] = useState<number>(today.getDate())
    const [month, setMonth] = useState<number>(globalMonth)
    const [year, setYear] = useState<number>(globalYear)
    const [appointments, setAppointments] = useState<TAppointment[]>([])
    const isToday = dateId(day, month, year) === dateId(today.getDate(), currentMonth, currentYear)

    const resetDay = (month: number, year: number) => {
        if (month == currentMonth && year == currentYear) {
            setDay(today.getDate())
        } else {
            setDay(0)
        }
    }

    useEffect(() => {
        resetDay(globalMonth, globalYear)
        setMonth(globalMonth)
        setYear(globalYear)
    }, [globalMonth, globalYear])

    const next = () => {
        setMonth(month => {
            if (month < 11) {
                month += 1
                resetDay(month, year)
            } else {
                month = 0
                setYear(year => {
                    year += 1
                    resetDay(month, year)
                    return year
                })
            }
            return month
        })
        setAppointments([])
    }

    const prev = () => {
        setMonth(month => {
            if (month > 0) {
                month -= 1
                resetDay(month, year)
            } else {
                month = 11
                setYear(year => {
                    year -= 1
                    resetDay(month, year)
                    return year
                })
            }
            return month
        })
        setAppointments([])
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
                day,
                setDay: (value: number) => setDay(value),
                setAppointments: (value: TAppointment[]) => setAppointments(value)
            }} />
        </Article>
    )

    const renderAppointments = appointments.map((appointment, index) => {
        const { title, time, clients } = appointment
        return <Card {...{ title, time, clients }} key={index} />
    })

    const Events = (
        <Section flex direct='column' gap='16px' className={styles.events}>
            <Div flex justify='between'>
                <Space size={8} direct='vertical'>
                    <Title level={2} fontSize='1.25rem' fontWeight={700} color={COLOR.DARK_BLUE}>
                        Upcoming Events
                    </Title>
                    <Text fontSize='1rem' fontWeight={500} color={COLOR.GREY_TEXT}>
                        {isToday && 'Today, '} {day ? `${day} ${months[month]}` : null}
                    </Text>
                </Space>
                <Button>
                    View All
                </Button>
            </Div>
            {renderAppointments}
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
