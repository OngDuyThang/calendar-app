import { prisma } from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponseDto } from 'types/api'
import { TCalendar } from 'types/calendar'
import { CODE, MESSAGE } from 'utils/constants'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseDto<TCalendar>>
) {
    if (req.method !== 'GET') {
        return res.status(CODE.METHOD_NOT_ALLOW).send({
            data: null,
            message: MESSAGE.METHOD_NOT_ALLOW,
            statusCode: CODE.METHOD_NOT_ALLOW
        })
    }

    const { slug } = req.query
    try {
        const calendar = await prisma.calendar.findFirst({ where: { id: slug as string } })
        if (!calendar) {
            return res.status(CODE.NOT_FOUND).send({
                data: null,
                message: MESSAGE.NOT_FOUND,
                statusCode: CODE.NOT_FOUND
            })
        }
        return res.status(CODE.READ_SUCCESS).json({
            data: calendar,
            message: MESSAGE.SUCCESS,
            statusCode: CODE.READ_SUCCESS
        })
    } catch (e) {
        res.status(CODE.INTERNAL_SERVER).send({
            data: null,
            message: MESSAGE.INTERNAL_SERVER,
            statusCode: CODE.INTERNAL_SERVER
        })
    }
}