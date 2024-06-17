export const average = (arr: number[]) => {
    if (arr.length === 0) {
        return 0
    }

    const sum = arr.reduce((accumulative, currentValue) => accumulative + currentValue)

    return sum / arr.length
}