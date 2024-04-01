import { Div } from 'components'
import { LargeCalendar, SmallCalendar } from 'modules'
import { useState, type FC } from 'react'
import styles from './index.module.scss'
import { currentMonth, currentYear } from 'utils/constants'

export type TGlobalMonthYear = Record<'month' | 'year', number>

const Calendar: FC = () => {
    const [selected, setSelected] = useState<string>('')
    const [global, setGlobal] = useState<TGlobalMonthYear>({
        month: currentMonth,
        year: currentYear
    })

    return (
        <Div className={styles.app} flex gap='16px'>
            <SmallCalendar {...{
                globalMonthYear: global,
                selected,
                setSelected: (value: string) => setSelected(value),
            }} />
            <LargeCalendar {...{
                globalMonthYear: global,
                setGlobalMonthYear: (value: TGlobalMonthYear) => setGlobal(value),
                selected
            }} />
        </Div>
    )
}

export default Calendar
