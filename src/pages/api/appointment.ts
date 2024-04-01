
import { prisma } from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponseDto } from 'types/api'
import { createAppointmentSchema } from 'utils/appointment'
import { CODE, MESSAGE } from 'utils/constants'
import { extractCalendarId } from 'utils/helpers'

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

    const { title, time, clients, dateId, calendarId } = value
    try {
        await createDate(dateId)
        await createOrPatchCalendar(calendarId, dateId, title)

        const belongCalendarId = extractCalendarId(dateId)
        if (belongCalendarId !== calendarId) {
            await createOrPatchCalendar(belongCalendarId, dateId, title)
        }

        await prisma.appointment.create({
            data: {
                title,
                time,
                clients,
                dateId
            }
        })

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
    try {
        await prisma.date.create({ data: { id: dateId } })
    } catch (e) {
        console.log(e)
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
    } else {
        await prisma.calendar.create({
            data: {
                id: calendarId,
                dateIds: [dateId],
                appointmentTitles: [title]
            }
        })
    }
}