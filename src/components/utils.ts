export function decOfNum(number: number, title: string[]) {
    const digit = number % 10;

    switch (digit) {
        case 1:
            return title[0];
        case 3:
        case 2:
        case 4:
            return title[1];
        case 5:
        case 0:
        case 6:
        case 7:
        case 8:
        case 9:
            return title[2];
    }
}
