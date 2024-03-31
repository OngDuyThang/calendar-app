import { ApiResponseDto } from "types/api";
import { CreateAppointmentDto } from "types/appointment";
import { axiosInstance } from "./axios";

export const createAppointment = async (
    request: CreateAppointmentDto
): Promise<ApiResponseDto> => {
    const { data } = await axiosInstance.post('appointment', request)
    return data
}