export function isUsername(value: string) {
    return /^[a-zA-Z0-9\-_.#$]{3,24}$/.test(value);
}

export function isEmail(value: string) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value,
    );
}
