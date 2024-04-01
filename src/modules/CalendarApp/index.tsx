import { Div } from 'components'
import { LargeCalendar, SmallCalendar } from 'modules'
import { useState, type FC } from 'react'
import styles from './index.module.scss'

const today = new Date()
const currentMonth = today.getMonth()
const currentYear = today.getFullYear()

const Calendar: FC = () => {
    const [month, setMonth] = useState<number>(currentMonth)
    const [year, setYear] = useState<number>(currentYear)

    return (
        <Div className={styles.app} flex gap='16px'>
            <SmallCalendar {...{
                globalMonth: month,
                globalYear: year
            }} />
            <LargeCalendar {...{
                setGlobalMonth: (value: number) => setMonth(value),
                setGlobalYear: (value: number) => setYear(value)
            }} />
        </Div>
    )
}

export default Calendar
