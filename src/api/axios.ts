import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiResponseDto } from "types/api";
import { API_URL, CODE, MESSAGE } from "utils/constants";

export const axiosInstance = axios.create({
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        return config;
    },
    function (e: AxiosError) {
        console.log(e)
    }
)

axiosInstance.interceptors.response.use(
    function (res: AxiosResponse<ApiResponseDto>) {
        return res
    },
    async function (e: AxiosError<ApiResponseDto>) {
        const { response } = e
        if (response) {
            const { data: { message, statusCode } } = response

            return {
                data: {
                    data: null,
                    message,
                    statusCode
                }
            }
        }
        return {
            data: {
                data: null,
                message: MESSAGE.INTERNAL_SERVER,
                statusCode: CODE.INTERNAL_SERVER
            }
        }
    },
);