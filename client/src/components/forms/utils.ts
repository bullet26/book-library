// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup'

export const initialValuesAddBook = {
  author: '',
  authorID: null,
  title: '',
  rating: '',
  series: null,
  seriesID: null,
  seriesNumber: null,
  pages: null,
  notes: null,
  description: '',
  readEnd: '',
  plot: null,
  bookCover: null,
}

export const validationSchemaAddBook = Yup.object({
  author: Yup.string().required('Required field!'),
  title: Yup.string().min(3, 'Minimum 3 letters to fill').required('Required field!'),
  rating: Yup.number().min(0).max(5).required('Required field!'),
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
