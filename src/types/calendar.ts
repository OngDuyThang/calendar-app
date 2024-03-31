import { Calendar as CalendarEntity } from "@prisma/client"

export type TCalendarCell = {
    day: number,
    id: string,
    inMonth: boolean
}

export type TCalendar = CalendarEntity