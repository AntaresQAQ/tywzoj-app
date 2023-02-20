export function range(start: number, end: number, step = 1): number[] {
  return Array(Math.ceil((end - start) / step))
    .fill(start)
    .map((value, idx) => value + idx * step);
}
