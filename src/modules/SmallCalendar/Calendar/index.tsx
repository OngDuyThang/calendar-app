import { useState, type FC, useEffect, useMemo } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { createCalendar } from 'utils/calendar';
import { getDateById } from 'api/date';
import { TAppointment } from 'types/appointment';
import { dateId, getDayFromDateId } from 'utils/helpers';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface IProps {
    month: number;
    year: number;
    day: number;
    setDay: (value: number) => void
    setAppointments: (value: TAppointment[]) => void
}

const Calendar: FC<IProps> = ({
    month,
    year,
    day,
    setDay,
    setAppointments
}) => {
    const calendar = useMemo(() => createCalendar(month, year), [month, year])

    useEffect(() => {
        if (day == new Date().getDate()) {
            (async () => {
                const data = await getDateById(dateId(day, month, year))
                const date = data.data
                if (date) {
                    const appointments = date.appointments as TAppointment[]
                    setAppointments(appointments)
                }
            })()
        }
    }, [day])

    const renderHead = (
        <tr>
            {days.map((day, index) => (
                <th key={index}><span>{day}</span></th>
            ))}
        </tr>
    )

    const handleGetAppointments = async (dateId: string) => {
        setDay(getDayFromDateId(dateId))
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
                            cell.id == dateId(day, month, year) && styles.focus
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
