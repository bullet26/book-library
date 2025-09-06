import { Document } from 'mongoose'

export const toObjectMapping = <T>(docs: Document[]): T[] => docs.map((item) => item.toObject())

export const toObjectMappingSingle = <T>(doc: Document): T => doc.toObject()
