import { Div } from 'components'
import { LargeCalendar, SmallCalendar } from 'modules'
import { type FC } from 'react'
import styles from './index.module.scss'

const Calendar: FC = () => {
    return (
        <Div className={styles.app} flex gap='16px'>
            <SmallCalendar />
            <LargeCalendar />
        </Div>
    )
}

export default Calendar
