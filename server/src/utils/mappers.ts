import { Document } from 'mongoose'

export const toObjectMapping = <T>(docs: Document[]): T[] => docs.map((item) => item.toJSON())

export const toObjectMappingSingle = <T>(doc: Document): T => doc.toJSON()

export const mapOneToOne = <T>(
  data: T[],
  ids: readonly string[],
  keyFn: (item: T) => string = (item: any) => item.id,
): (T | undefined)[] => {
  const map = new Map(data.map((item) => [keyFn(item), item]))
  return ids.map((id) => map.get(id) || undefined)
}

export const mapOneToMany = <T>(
  data: T[],
  ids: readonly string[],
  keyFn: (item: T) => string,
): T[][] => {
  const map = new Map<string, T[]>()

  for (const item of data) {
    const key = keyFn(item)
    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key)!.push(item)
  }

  return ids.map((id) => map.get(id) || [])
}
