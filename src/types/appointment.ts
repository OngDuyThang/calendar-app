import { Appointment as AppointmentEntity } from "@prisma/client"

export type TAppointment = AppointmentEntity

export type CreateAppointmentDto = {
    title: string,
    time: string,
    clients: string[],
    dateId: string,
    calendarId: string,
}