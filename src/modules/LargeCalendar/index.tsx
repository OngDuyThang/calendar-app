import { Button, Div, Section, Space, Text } from 'components'
import { CSSProperties, useState, type FC, useEffect } from 'react'
import styles from './index.module.scss'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { COLOR, currentMonth, currentYear, months } from 'utils/constants'
import Calendar from './Calendar'
import { TGlobalMonthYear } from 'modules/CalendarApp'
import Months from './Months'

interface IProps {
    globalMonthYear: TGlobalMonthYear;
    setGlobalMonthYear: (value: TGlobalMonthYear) => void;
    selected: string
}

const LargeCalendar: FC<IProps> = ({
    globalMonthYear,
    setGlobalMonthYear,
    selected
}) => {
    const iconCss: CSSProperties = {
        cursor: 'pointer',
        color: COLOR.DARK_BLUE
    }
    const [month, setMonth] = useState<number>(currentMonth)
    const [year, setYear] = useState<number>(currentYear)

    useEffect(() => {
        setMonth(globalMonthYear.month)
        setYear(globalMonthYear.year)
    }, [globalMonthYear])

    const next = () => {
        setMonth(month => {
            if (month < 11) {
                month += 1
                setGlobalMonthYear({
                    month,
                    year
                })
            } else {
                month = 0
                setYear(year => {
                    year += 1
                    setGlobalMonthYear({
                        month,
                        year
                    })
                    return year
                })
            }
            return month
        })
    }

    const prev = () => {
        setMonth(month => {
            if (month > 0) {
                month -= 1
                setGlobalMonthYear({
                    month,
                    year
                })
            } else {
                month = 11
                setYear(year => {
                    year -= 1
                    setGlobalMonthYear({
                        month,
                        year
                    })
                    return year
                })
            }
            return month
        })
    }

    const getToday = () => {
        setGlobalMonthYear({
            month: currentMonth,
            year: currentYear
        })

        setMonth(currentMonth)
        setYear(currentYear)
    }

    const Header = (
        <Div flex justify='between' align='center' className={styles.header}>
            <Space size={16} center>
                <Button
                    variant='outline'
                    onClick={getToday}
                >
                    Today
                </Button>
                <FaAngleLeft
                    style={iconCss} className='w-5 h-5'
                    onClick={prev}
                />
                <FaAngleRight
                    style={iconCss} className='w-5 h-5'
                    onClick={next}
                />
                <Text fontSize='1.25rem' fontWeight={700} color={COLOR.DARK_BLUE} notSelect>
                    {months[month]} {year}
                </Text>
            </Space>
            <Months {...{
                globalMonthYear,
                setGlobalMonthYear: (value: TGlobalMonthYear) => setGlobalMonthYear(value)
            }} />
        </Div>
    )

    return (
        <Section
            width='60'
            className={styles.root}
        >
            {Header}
            <Calendar {...{ month, year, selected }} />
        </Section>
    )
}

export default LargeCalendar
