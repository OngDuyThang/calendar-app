export enum COLOR {
    LIGHT_BLUE = '#5684AE',
    DARK_BLUE = '#0F4C81',
    LIGHT_ORANGE = '#FFE4C8',
    DARK_ORANGE = '#F9BE81',
    CALENDAR_TITLE_COLOR = '#E4F6ED',
    GREY_TEXT = '#958FA0'
}

export enum MESSAGE {
    SUCCESS = 'SUCCESS',
    NOT_FOUND = 'NOT_FOUND',
    CONFLICT = 'CONFLICT_EXCEPTION',
    BAD_REQUEST = 'BAD_REQUEST',
    INTERNAL_SERVER = 'INTERNAL_SERVER',
    METHOD_NOT_ALLOW = 'METHOD_NOT_ALLOW'
}

export enum CODE {
    READ_SUCCESS = 200,
    WRITE_SUCCESS = 201,
    INTERNAL_SERVER = 500,
    NOT_FOUND = 404,
    CONFLICT = 409,
    BAD_REQUEST = 400,
    UNAUTHORIZE = 401,
    FORBIDEN = 403,
    METHOD_NOT_ALLOW = 405
}

export const today = new Date()
export const currentMonth = today.getMonth()
export const currentYear = today.getFullYear()
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const API_URL = process.env.NEXT_PUBLIC_API_URL