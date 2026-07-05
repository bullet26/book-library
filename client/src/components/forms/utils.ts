import * as Yup from 'yup'
import dayjs from 'dayjs'
import { MediaType } from '__graphql/__generated__/enums'

// ------------------------------------- /// add book form

export const AddBookInitialValues = {
  authorID: '',
  title: '',
  rating: 0,
  seriesID: '',
  seriesNumber: null,
  pages: null,
  notes: '',
  description: '',
  readEnd: dayjs(),
  plot: null,
  bookCover: null,
  bookCoverThumbnail: null,
}

export const AddBookValidationSchema = Yup.object({
  authorID: Yup.string().required('Required field!'),
  title: Yup.string().min(3, 'Minimum 3 letters to fill').required('Required field!'),
  rating: Yup.number().min(0).max(5),
  seriesID: Yup.string().defined(),
  seriesNumber: Yup.number().positive('Series number must be a positive').nullable().defined(),
  pages: Yup.number().positive('Pages quantity must be a positive').nullable(),
  notes: Yup.string().min(5, 'Minimum 5 letters to fill').defined(),
  description: Yup.string().min(2, 'Minimum 10 letters to fill').required('Required field!'),
  readEnd: Yup.mixed<dayjs.Dayjs>().required('Required field!'),
  plot: Yup.string().min(100, 'Minimum 100 letters to fill').nullable().defined(),
  bookCover: Yup.string().nullable().defined(),
  bookCoverThumbnail: Yup.string().nullable().defined(),
})

export type AddBookFormType = Yup.InferType<typeof AddBookValidationSchema>

// ------------------------------------- /// add author form

export const AddAuthorInitialValues = {
  name: '',
  surname: '',
  portrait: null,
  portraitThumbnail: null,
  transcriptionName: '',
}

export const AddAuthorValidationSchema = Yup.object({
  name: Yup.string().required('Required field!'),
  surname: Yup.string().required('Required field!'),
  portrait: Yup.string().nullable().defined(),
  portraitThumbnail: Yup.string().nullable().defined(),
  transcriptionName: Yup.string().min(3, 'Minimum 3 letters to fill'),
})

export type AddAuthorFormType = Yup.InferType<typeof AddAuthorValidationSchema>

// ------------------------------------- /// add series form

export const AddSerieInitialValues = {
  authorID: '',
  title: '',
}

export const AddSerieValidationSchema = Yup.object({
  authorID: Yup.string().required('Required field!'),
  title: Yup.string().required('Required field!'),
})

export type AddSerieFormType = Yup.InferType<typeof AddSerieValidationSchema>

// ------------------------------------- /// re read book form

export const ReReadBookInitialValues = {
  bookID: '',
  readEnd: dayjs(),
}

export const ReReadBookValidationSchema = Yup.object({
  bookID: Yup.string().required('Required field!'),
  readEnd: Yup.mixed<dayjs.Dayjs>().required('Required field!'),
})

export type ReReadBookFormType = Yup.InferType<typeof ReReadBookValidationSchema>

// ------------------------------------- /// media form

export const MediaInitialValues = {
  bookID: '',
  url: '',
  type: MediaType.Video,
}

export const MediaValidationSchema = Yup.object({
  bookID: Yup.string().required('Required field!'),
  url: Yup.mixed<string | string[]>().required('Required field!'),
  type: Yup.mixed<MediaType>().oneOf(Object.values(MediaType)).required('Required field!'),
})

export type MediaFormType = Yup.InferType<typeof MediaValidationSchema>

// ------------------------------------- /// update book plot form

export const UpdatePlotValidationSchema = Yup.object({
  id: Yup.string().required('Required field!'),
  bookID: Yup.string().required('Required field!'),
  plot: Yup.string().min(100, 'Minimum 100 letters to fill').required('Required field!'),
})

export type UpdatePlotFormType = Yup.InferType<typeof UpdatePlotValidationSchema>
