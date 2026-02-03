import { Document } from 'mongoose'

export const toObjectMapping = <T>(docs: Document[]): T[] => docs.map((item) => item.toJSON())

export const toObjectMappingSingle = <T>(doc: Document): T => doc.toJSON()
