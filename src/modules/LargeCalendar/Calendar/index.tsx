import { useMemo, type FC, useState, useEffect } from 'react'
import { createCalendar } from 'utils/calendar'
import styles from './index.module.scss'
import clsx from 'clsx';
import { Modal } from 'components';
import AppointmentForm from '../AppoinmentForm';
import { generateCalendarId } from 'utils/helpers';
import { getCalendarById } from 'api/calendar';
import { TCalendar } from 'types/calendar';
import { days } from 'utils/constants';

interface IProps {
    month: number;
    year: number;
    selected: string;
}

const Calendar: FC<IProps> = ({
    month,
    year,
    selected
}) => {
    const calendarRender = useMemo(() => createCalendar(month, year), [month, year])
    const [open, setOpen] = useState<boolean>(false)
    const [dateId, setDateId] = useState<string>('')
    const [calendar, setCalendar] = useState<TCalendar | null>(null)

    useEffect(() => {
        (async () => {
            const data = await getCalendarById(generateCalendarId(month, year))
            setCalendar(data.data)
        })()
    }, [month, year])

    const renderHead = (
        <tr>
            {days.map((day, index) => (
                <th key={index}><div className='pb-4'>{day}</div></th>
            ))}
        </tr>
    )

    const handleClickCell = (dateId: string) => {
        setDateId(dateId)
        setOpen(true)
    }

    const appointmentTitles = (dateId: string) => {
        if (calendar) {
            const indexArr = calendar.dateIds.reduce((res: number[], id: string, index: number) => {
                if (id == dateId) {
                    res.push(index)
                }
                return res
            }, [])
            return indexArr.map(index => calendar.appointmentTitles[index])
        }
        return []
    }

    const renderAppointmentTitles = (dateId: string) => (
        <div className={styles.titles}>
            {appointmentTitles(dateId).slice(0, 2).map((title, index) => (
                <div className={styles.title} key={index}>{title}</div>
            ))}
            <span className='text-[0.75rem] text-blue-500'>
                {appointmentTitles(dateId).length > 2 ? `${appointmentTitles(dateId).length - 2} more` : null}
            </span>
        </div>
    )

    const renderBody = calendarRender.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
                <td
                    key={cellIndex}
                    onClick={() => handleClickCell(cell.id)}
                >
                    <span
                        className={clsx(
                            styles.day,
                            cell.inMonth && styles.inMonth,
                            cell.id == selected && styles.focus
                        )}
                    >
                        {cell.day}
                    </span>
                    {renderAppointmentTitles(cell.id)}
                </td>
            ))}
        </tr>
    ))

    const Form = (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            width='400px'
            title='Create Appointment'
        >
            <AppointmentForm {...{
                dateId,
                calendarId: generateCalendarId(month, year),
                setCalendar: (value: TCalendar) => setCalendar(value)
            }} />
        </Modal>
    )

    return (
        <>
            <table className={styles.root}>
                <thead>
                    {renderHead}
                </thead>

                <tbody>
                    {renderBody}
                </tbody>
            </table>
            {Form}
        </>
    )
}

export default Calendar
