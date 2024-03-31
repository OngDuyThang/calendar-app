import { ApiResponseDto } from "types/api";
import { axiosInstance } from "./axios";
import { TDate } from "types/date";

export const getDateById = async (
    id: string
): Promise<ApiResponseDto<TDate>> => {
    const { data } = await axiosInstance.get(`date/${id}`)
    return data
}