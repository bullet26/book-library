import * as Yup from 'yup'
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs'
import { MediaType } from '__graphql/__generated__/graphql'

export const initialValuesAddBook = {
  author: '',
  authorID: null,
  title: '',
  rating: 0,
  series: null,
  seriesID: null,
  seriesNumber: null,
  pages: null,
  notes: null,
  description: '',
  readEnd: dayjs(),
  plot: null,
  bookCover: null,
}

export const validationSchemaAddBook = Yup.object({
  author: Yup.string().required('Required field!'),
  title: Yup.string().min(3, 'Minimum 3 letters to fill').required('Required field!'),
  rating: Yup.number().min(0).max(5),
  series: Yup.string().nullable(),
  seriesNumber: Yup.number().positive('Series number must be a positive').nullable(),
  pages: Yup.number().positive('Pages quantity must be a positive').nullable(),
  notes: Yup.string().min(5, 'Minimum 5 letters to fill').nullable(),
  description: Yup.string().min(2, 'Minimum 10 letters to fill').required('Required field!'),
  readEnd: Yup.string().required('Required field!'),
  plot: Yup.string().min(100, 'Minimum 100 letters to fill').nullable(),
})

export const initialValuesAddAuthor = {
  name: '',
  surname: '',
  portrait: null,
  transcriptionName: null,
}

export const validationSchemaAddAuthor = Yup.object({
  name: Yup.string().required('Required field!'),
  surname: Yup.string().required('Required field!'),
  portrait: Yup.string().nullable(),
  transcriptionName: Yup.string().min(3, 'Minimum 3 letters to fill').nullable(),
})

export const initialValuesReReadBook = {
  title: '',
  bookID: null,
  readEnd: dayjs(),
}

export const validationSchemaReReadBook = Yup.object({
  title: Yup.string().required('Required field!'),
  readEnd: Yup.string().required('Required field!'),
})

export const initialValuesAddSerie = {
  author: '',
  authorID: null,
  title: '',
}

export const validationSchemaAddSerie = Yup.object({
  author: Yup.string().required('Required field!'),
  title: Yup.string().required('Required field!'),
})

export const initialValuesMedia = {
  title: '',
  bookID: null,
  url: '',
  type: MediaType.Video,
}

export const validationSchemaMedia = Yup.object({
  title: Yup.string().required('Required field!'),
})
