import { dateId } from 'utils/helpers'
import { TCalendarCell } from 'types/calendar'

export const createCalendar = (month: number, year: number) => {
    const firstDayNth = new Date(year, month).getDay() // Thứ tự xuất hiện của ngày 1
    const lastDay = new Date(year, month + 1, 0).getDate() // Ngày cuối cùng của tháng đó

    // arr[i][j] có giá trị là 1 object chứa 2 key ngày và ghi chú
    let calendar = [], count = 0
    for (let row = 0; row < 6; row += 1) {
        let arr: TCalendarCell[] = []

        for (let column = 0; column < 7; column += 1) {
            let day: number, id: string, inMonth = true

            if (row === 0 && column < firstDayNth) {
                const dayNth = (column + 1) - firstDayNth
                const date = new Date(year, month, dayNth)

                day = date.getDate()
                id = dateId(day, date.getMonth(), date.getFullYear())
                inMonth = false
            } else {
                if (count < lastDay) {
                    day = count += 1
                    id = dateId(day, month, year)
                } else {
                    count += 1
                    const date = new Date(year, month, count)

                    day = date.getDate()
                    id = dateId(day, date.getMonth(), date.getFullYear())
                    inMonth = false
                }
            }

            arr.push({ day, id, inMonth })
        }

        calendar.push(arr)
        if (row === 4 && arr.find(cell => cell.day == lastDay)) break
    }

    return calendar
}