export interface ApiResponseDto<T = unknown> {
    data: T | null;
    message?: string;
    statusCode?: number
}