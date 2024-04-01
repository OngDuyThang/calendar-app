import { useState, type FC, useEffect, useMemo } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { createCalendar } from 'utils/calendar';
import { getDateById } from 'api/date';
import { TAppointment } from 'types/appointment';
import { generateDateId } from 'utils/helpers';
import { currentMonth, currentYear, days, today } from 'utils/constants';

interface IProps {
    month: number;
    year: number;
    setSelected: (value: string) => void;
    setAppointments: (value: TAppointment[]) => void
}

const Calendar: FC<IProps> = ({
    month,
    year,
    setSelected,
    setAppointments
}) => {
    const calendar = useMemo(() => createCalendar(month, year), [month, year])
    const [dateId, setDateId] = useState<string>('')

    useEffect(() => {
        (async () => {
            setDateId('')
            setAppointments([])

            if (month == currentMonth && year == currentYear) {
                const dateId = generateDateId(today.getDate(), month, year)
                setDateId(dateId)

                const data = await getDateById(dateId)
                const date = data.data
                if (date) {
                    const appointments = date.appointments as TAppointment[]
                    setAppointments(appointments)
                }
            }
        })()
    }, [month, year])

    useEffect(() => {
        if (dateId) {
            setSelected(dateId)
        } else {
            setSelected('')
        }
    }, [dateId])

    const renderHead = (
        <tr>
            {days.map((day, index) => (
                <th key={index}><span>{day}</span></th>
            ))}
        </tr>
    )

    const handleGetAppointments = async (dateId: string) => {
        setDateId(dateId)
        setAppointments([])

        const data = await getDateById(dateId)
        const date = data.data
        if (date) {
            const appointments = date.appointments as TAppointment[]
            setAppointments(appointments)
        }
    }

    const renderBody = calendar.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                    <span
                        className={clsx(
                            styles.day,
                            cell.inMonth && styles.inMonth,
                            cell.id == dateId && styles.focus
                        )}
                        data-dateid={cell.id}
                        onClick={() => handleGetAppointments(cell.id)}
                    >
                        {cell.day}
                    </span>
                </td>
            ))}
        </tr>
    ))

    return (
        <table className={styles.root}>
            <thead>
                {renderHead}
            </thead>

            <tbody>
                {renderBody}
            </tbody>
        </table>
    )
}

export default Calendar
