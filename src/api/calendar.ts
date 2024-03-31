import { ApiResponseDto } from "types/api";
import { axiosInstance } from "./axios";
import { TCalendar } from "types/calendar";

export const getCalendarById = async (
    id: string
): Promise<ApiResponseDto<TCalendar>> => {
    const { data } = await axiosInstance.get(`calendar/${id}`)
    return data
}