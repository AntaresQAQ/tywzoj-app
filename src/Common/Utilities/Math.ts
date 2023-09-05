export function range(start: number, end: number, step = 1): number[] {
    if (end <= start) return [];
    return Array(Math.ceil((end - start) / step))
        .fill(start)
        .map((value, idx) => value + idx * step);
}
