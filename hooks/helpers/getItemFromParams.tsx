export function getItemFromParams<T = any>(data: string): T | null {
  if (data === undefined) {
    return null;
  }
  return JSON.parse(data);
}
