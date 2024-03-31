import { prisma } from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const test = await prisma.appointment.create({ data: { title: '', time: '', clients: [], dateId: '' } })
    console.log('test', test)
    res.status(200).json({ message: 'Hello from Next.js!' })
}