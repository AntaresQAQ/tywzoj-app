export function format(originalString: string, ...replacementStrings: Array<string | number>) {
    if (!originalString) {
        return originalString;
    }

    return originalString.replace(/{(\d+)}/g, (match: string, index: number) => {
        return replacementStrings[index] !== undefined && replacementStrings[index] !== null
            ? replacementStrings[index].toString()
            : match;
    });
}
