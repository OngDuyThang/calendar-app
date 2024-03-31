import { Button, Div, Section, Space, Text } from 'components'
import { CSSProperties, useState, type FC } from 'react'
import styles from './index.module.scss'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { COLOR } from 'utils/constants'
import Calendar from './Calendar'

const today = new Date()
const currentMonth = today.getMonth()
const setCurrentYear = today.getFullYear()
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const LargeCalendar: FC = () => {
    const iconCss: CSSProperties = {
        cursor: 'pointer',
        color: COLOR.DARK_BLUE
    }
    const [month, setMonth] = useState<number>(currentMonth)
    const [year, setYear] = useState<number>(setCurrentYear)

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

    const Header = (
        <Div flex justify='between' className={styles.header}>
            <Space size={16} center>
                <Button variant='outline'>
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
            <Button variant='outline'>
                Month
            </Button>
        </Div>
    )

    return (
        <Section
            width='60'
            className={styles.root}
        >
            {Header}
            <Calendar {...{ month, year }} />
        </Section>
    )
}

export default LargeCalendar
