export const dateId = (
    day: number,
    month: number,
    year: number
) => `${day}-${month + 1}-${year}`

export const calendarId = (
    month: number,
    year: number
) => `${month + 1}-${year}`

export const extractCalendarId = (dateId: string) => {
    const arr = dateId.split('-')
    return `${arr[1]}-${arr[2]}`
}

export const getDayFromDateId = (dateId: string) => parseInt(dateId.split('-')[0])