import { Date as DateEntity } from "@prisma/client"
import { TAppointment } from "./appointment"

export type TDate = DateEntity & {
    appointments?: TAppointment[]
}