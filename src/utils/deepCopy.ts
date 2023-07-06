export function deepCopy<T extends {}>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
