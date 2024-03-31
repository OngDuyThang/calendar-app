import { Button, Div } from 'components'
import { FormEvent, type FC, useRef } from 'react'
import { Title } from './title';
import { Time } from './time'
import { Client } from './client';
import { CreateAppointmentDto } from 'types/appointment';
import { createAppointment } from 'api/appointment';

interface IProps {
    dateId: string;
    calendarId: string
}

const AppointmentForm: FC<IProps> = ({
    dateId,
    calendarId
}) => {
    const form = useRef<HTMLFormElement>(null)

    const Submit = (
        <Div flex direct='row-reverse'>
            <Button type='submit'>
                Create
            </Button>
        </Div>
    )

    const formatFormData = () => {
        if (form.current) {
            const formData = new FormData(form.current)
            const request: CreateAppointmentDto = {
                title: '',
                time: '',
                clients: [],
                dateId,
                calendarId,
            }

            let hour = '', minutes = '', ampm = ''
            for (let entry of formData.entries()) {
                const key = entry[0]
                const value = entry[1] as string
                switch (key) {
                    case 'title': request.title = value; break;
                    case 'hour': hour = value; break;
                    case 'minutes': minutes = value; break;
                    case 'ampm': ampm = value; break;
                    case 'client': request.clients.push(value); break;
                }
            }

            request.time = `${hour}:${minutes} ${ampm}`
            return request
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const request = formatFormData() as CreateAppointmentDto
        const data = await createAppointment(request)
        console.log(data)
    }

    return (
        <form
            className='w-full'
            onSubmit={handleSubmit}
            ref={form}
        >
            {Title}
            {Time}
            {Client}
            {Submit}
        </form>
    )
}

export default AppointmentForm
