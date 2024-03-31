import Joi from "joi";

export const createAppointmentSchema = Joi.object({
    title: Joi.string().required(),
    time: Joi.string().required(),
    clients: Joi.array().items(Joi.string()),
    dateId: Joi.string().required(),
    calendarId: Joi.string().required()
})