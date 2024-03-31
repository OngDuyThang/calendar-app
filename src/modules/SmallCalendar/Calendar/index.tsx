import { useState, type FC, useEffect, useMemo } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'
import { createCalendar } from 'utils/calendar';
import { getDateById } from 'api/date';
import { TAppointment } from 'types/appointment';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface IProps {
    month: number;
    year: number;
    setAppointments: (value: TAppointment[]) => void
}

const Calendar: FC<IProps> = ({
    month,
    year,
    setAppointments
}) => {
    const calendar = useMemo(() => createCalendar(month, year), [month, year])

    const renderHead = (
        <tr>
            {days.map((day, index) => (
                <th key={index}><span>{day}</span></th>
            ))}
        </tr>
    )

    const handleGetAppointments = async (dateId: string) => {
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
                            cell.inMonth && styles.inMonth
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
