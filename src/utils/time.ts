export const hours = () => {
    let arr: string[] = []
    for (let i = 1; i <= 12; i += 1) {
        arr.push(i.toString().padStart(2, '0'))
    }
    return arr
}

export const minutes = () => {
    let arr: string[] = []
    for (let i = 0; i <= 59; i += 1) {
        arr.push(i.toString().padStart(2, '0'))
    }
    return arr
}