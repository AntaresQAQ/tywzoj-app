export function combineAttributes(...attributes: Array<string | undefined | false | null>) {
    let result = attributes
        .map((attr) => attr && attr.trim())
        .filter((attr) => !!attr)
        .join(" ");
    if (!result && !attributes.some((item) => item === "")) {
        result = undefined;
    }

    return result;
}
