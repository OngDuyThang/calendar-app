export const dateId = (
    day: number,
    month: number,
    year: number
) => `${day}-${month + 1}-${year}`

export const calendarId = (
    month: number,
    year: number
) => `${month + 1}-${year}`