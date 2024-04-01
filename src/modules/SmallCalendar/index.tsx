import { Article, Button, Div, Section, Space, Text, Title } from 'components'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { COLOR, currentMonth, currentYear, months, today } from 'utils/constants'
import { CSSProperties, useState, type FC, useEffect } from 'react'
import Card from './Card'
import styles from './index.module.scss'
import Calendar from './Calendar';
import { TAppointment } from 'types/appointment';
import { TGlobalMonthYear } from 'modules/CalendarApp';

const iconCss: CSSProperties = {
    cursor: 'pointer',
    color: COLOR.DARK_BLUE
}
interface IProps {
    globalMonthYear: TGlobalMonthYear;
    selected: string;
    setSelected: (value: string) => void
}

const SmallCalendar: FC<IProps> = ({
    globalMonthYear,
    selected,
    setSelected
}) => {
    const [month, setMonth] = useState<number>(globalMonthYear.month)
    const [year, setYear] = useState<number>(globalMonthYear.year)
    const [appointments, setAppointments] = useState<TAppointment[]>([])

    const selectedDay = parseInt(selected.split('-')[0])
    const selectedMonth = parseInt(selected.split('-')[1]) - 1
    const isToday = selectedDay == today.getDate() && month == currentMonth && year == currentYear

    useEffect(() => {
        setMonth(globalMonthYear.month)
        setYear(globalMonthYear.year)
    }, [globalMonthYear])

    const next = () => {
        setMonth(month => {
            if (month < 11) {
                month += 1
            } else {
                month = 0
                setYear(year + 1)
            }
            return month
        })
    }

    const prev = () => {
        setMonth(month => {
            if (month > 0) {
                month -= 1
            } else {
                month = 11
                setYear(year - 1)
            }
            return month
        })
    }

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
                setSelected: (value: string) => setSelected(value),
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
                        {isToday && 'Today, '} {selectedDay ? `${selectedDay} ${months[selectedMonth]}` : null}
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
