// src/utils/groupBy.ts
// Utility to count occurrences by arbitrary key
export function groupByCount<T>(
  arr: T[],
  keyFn: (item: T) => string | undefined
): { name: string; value: number }[] {
  const counts: Record<string, number> = {};
  arr.forEach(item => {
    const key = keyFn(item);
    if (key) counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}
