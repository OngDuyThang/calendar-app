import { prisma } from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponseDto } from 'types/api'
import { TDate } from 'types/date'
import { CODE, MESSAGE } from 'utils/constants'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseDto<TDate>>
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
        const date = await prisma.date.findFirst({
            where: { id: slug as string },
            include: { appointments: true }
        })
        if (!date) {
            return res.status(CODE.NOT_FOUND).send({
                data: null,
                message: MESSAGE.NOT_FOUND,
                statusCode: CODE.NOT_FOUND
            })
        }
        return res.status(CODE.READ_SUCCESS).json({
            data: date,
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