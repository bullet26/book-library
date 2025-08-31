import { useState } from 'react'
import { Formik, Form, type FormikHelpers } from 'formik'
import { Button, Rate } from 'antd'
import { useMutation } from '@apollo/client/react'
import { CREATE_BOOK } from 'apollo'
import { SearchInForm } from 'components'
import { DatepickerInput, Input, InputFromEditableDiv, Modal, Error } from 'UI'
import { initialValuesAddBook, validationSchemaAddBook } from '../utils'
import s from '../Form.module.scss'

interface AddBookFormProps {
  bookCover: string | null
  handleClickAuthorBtn: () => void
  isShowAuthorForm: boolean
  handleClickSerieBtn: () => void
  isShowSerieForm: boolean
}

type ValuesAddBookType = typeof initialValuesAddBook

export const AddBookForm = (props: AddBookFormProps) => {
  const {
    handleClickAuthorBtn,
    isShowAuthorForm,
    isShowSerieForm,
    handleClickSerieBtn,
    bookCover,
  } = props

  const windowWidth = window.innerWidth

  const dateFormat = 'YYYY-MM-DD'

  const [createBookApollo, { data, error }] = useMutation(CREATE_BOOK)

  const [rating, setRating] = useState(0)

  const onSubmit = (values: ValuesAddBookType, { resetForm }: FormikHelpers<ValuesAddBookType>) => {
    const { author, series, plot, description, readEnd, ...filteredValues } = values

    const bookCoverThumbnail =
      bookCover?.replace(/\/upload\//, '/upload/c_thumb,w_218,h_323/') || null

    createBookApollo({
      variables: {
        input: {
          ...filteredValues,
          rating,
          plot,
          description,
          readEnd: readEnd?.format(dateFormat),
          bookCoverThumbnail,
          bookCover,
        },
      },
    })

    resetForm()
    setRating(0)
  }

  return (
    <div className={s.addFormWrapper}>
      <div className={s.title}>Add read book</div>
      <Formik
        initialValues={initialValuesAddBook}
        validationSchema={validationSchemaAddBook}
        onSubmit={onSubmit}>
        <Form className={s.form}>
          <Input placeholder="Book title" name="title" />
          <div className={s.innerWrapper}>
            <div className={s.flexGrowItem}>
              <SearchInForm type="authors" />
            </div>
            {windowWidth > 582 && (
              <div className={s.flexItem}>
                <Button type="default" size="middle" onClick={handleClickAuthorBtn}>
                  {isShowAuthorForm ? 'Hide author form' : 'Add new author'}
                </Button>
              </div>
            )}
          </div>
          <div className={s.innerWrapper}>
            <div className={s.ratingWrapper}>
              <div className={s.ratingLabel}>Book rating:</div>
              <input type="hidden" name="rating" />
              <Rate
                allowHalf
                value={rating}
                style={{ width: '200px', color: '#9E339F' }}
                onChange={(value) => setRating(value)}
              />
            </div>
            <DatepickerInput name="readEnd" />
          </div>
          <div className={s.innerWrapper}>
            <div className={s.flexGrowItem}>
              <SearchInForm type="series" />
            </div>
            <div className={s.flexItem}>
              <Input placeholder="Book series number" name="seriesNumber" htmlType="number" />
            </div>

            {windowWidth > 582 && (
              <div className={s.flexItem}>
                <Button type="default" size="middle" onClick={handleClickSerieBtn}>
                  {isShowSerieForm ? 'Hide serie form' : 'Add new serie'}
                </Button>
              </div>
            )}
          </div>
          <div className={s.innerWrapper}>
            <Input placeholder="Book pages" name="pages" htmlType="number" />
            <Input placeholder="Book notes" name="notes" />
          </div>
          <InputFromEditableDiv placeholder="Book annotation" name="description" />
          <InputFromEditableDiv placeholder="Book plot description" name="plot" />

          {windowWidth < 582 && (
            <div className={s.innerWrapper}>
              <Button type="default" size="middle" onClick={handleClickSerieBtn}>
                {isShowSerieForm ? 'Hide serie form' : 'Add new serie'}
              </Button>
              <Button type="default" size="middle" onClick={handleClickAuthorBtn}>
                {isShowAuthorForm ? 'Hide author form' : 'Add new author'}
              </Button>
            </div>
          )}
          <input type="hidden" name="bookCover" />
          <input type="hidden" name="bookCoverThumbnail" />
          <Button className={s.submitBtn} type="primary" size="large" htmlType="submit">
            ADD BOOK
          </Button>
        </Form>
      </Formik>
      {!!data && (
        <Modal
          content={`book ${data.bookInfo.title} was created, author - ${data.bookInfo.author.name} ${data.bookInfo.author.surname} `}
        />
      )}
      {!!error && <Error />}
    </div>
  )
}
