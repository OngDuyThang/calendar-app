
import { prisma } from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponseDto } from 'types/api'
import { createAppointmentSchema } from 'utils/appointment'
import { CODE, MESSAGE } from 'utils/constants'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseDto<null>>
) {
    if (req.method !== 'POST') {
        return res.status(CODE.METHOD_NOT_ALLOW).send({
            data: null,
            message: MESSAGE.METHOD_NOT_ALLOW,
            statusCode: CODE.METHOD_NOT_ALLOW
        })
    }

    const { error, value } = createAppointmentSchema.validate(req.body)
    if (error) {
        return res.status(CODE.BAD_REQUEST).send({
            data: null,
            message: MESSAGE.BAD_REQUEST,
            statusCode: CODE.BAD_REQUEST
        })
    }
    console.log('value: ', value)

    const { title, time, clients, dateId, calendarId } = value
    try {
        await createDate(dateId)
        await createOrPatchCalendar(calendarId, dateId, title)

        await prisma.appointment.create({
            data: {
                title,
                time,
                clients,
                dateId
            }
        })
        console.log('create appointment')

        return res.status(CODE.WRITE_SUCCESS).json({
            data: null,
            message: MESSAGE.SUCCESS,
            statusCode: CODE.WRITE_SUCCESS
        })
    } catch (e) {
        res.status(CODE.INTERNAL_SERVER).send({
            data: null,
            message: MESSAGE.INTERNAL_SERVER,
            statusCode: CODE.INTERNAL_SERVER
        })
    }
}

async function createDate(dateId: string): Promise<void> {
    const date = await prisma.date.findFirst({ where: { id: dateId } })
    console.log('date: ', date)
    if (!date) {
        await prisma.date.create({ data: { id: dateId } })
        console.log('create date')
    }
}

async function createOrPatchCalendar(
    calendarId: string,
    dateId: string,
    title: string
): Promise<void> {
    const calendar = await prisma.calendar.findFirst({ where: { id: calendarId } })

    if (calendar) {
        calendar.dateIds.push(dateId)
        calendar.appointmentTitles.push(title)
        await prisma.calendar.update({
            where: {
                id: calendar.id
            },
            data: {
                dateIds: calendar.dateIds,
                appointmentTitles: calendar.appointmentTitles
            }
        })
        console.log('update calendar: ', calendar)
    } else {
        await prisma.calendar.create({
            data: {
                id: calendarId,
                dateIds: [dateId],
                appointmentTitles: [title]
            }
        })
        console.log('create calendar')
    }
}