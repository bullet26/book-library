import { FC, useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Button, Rate } from 'antd'
import { BookInput } from 'types'
import { SearchInForm } from 'components'
import { DatepickerInput, Input, InputFromEditableDiv } from 'UI'
import { initialValuesAddBook, validationSchemaAddBook } from '../utils'
import s from '../Form.module.scss'

interface AddBookFormProps {
  handleClickAuthorBtn: () => void
  isShowAuthorForm: boolean
  onSubmitRequest: (values: BookInput) => void
}

type ValuesAddBookType = typeof initialValuesAddBook

const AddBookForm: FC<AddBookFormProps> = (props) => {
  const windowWidth = window.innerWidth
  const { handleClickAuthorBtn, isShowAuthorForm, onSubmitRequest } = props
  const dateFormat = 'YYYY-MM-DD'
  const [rating, setRating] = useState(0)

  const onSubmit = (values: ValuesAddBookType, { resetForm }: FormikHelpers<ValuesAddBookType>) => {
    const { author, series, plot, description, readEnd, ...filteredValues } = values

    onSubmitRequest({
      ...filteredValues,
      rating,
      plot,
      description,
      readEnd: readEnd?.format(dateFormat),
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
            {windowWidth > 582 && (
              <div className={s.flexItem}>
                <Button type="default" size="middle" disabled>
                  Add new series
                </Button>
              </div>
            )}
            <div className={s.flexItem}>
              <Input placeholder="Book series number" name="seriesNumber" htmlType="number" />
            </div>
          </div>
          <div className={s.innerWrapper}>
            <Input placeholder="Book pages" name="pages" htmlType="number" />
            <Input placeholder="Book notes" name="notes" />
          </div>
          <InputFromEditableDiv placeholder="Book annotation" name="description" />
          <InputFromEditableDiv placeholder="Book plot description" name="plot" />

          {windowWidth < 582 && (
            <div className={s.innerWrapper}>
              <Button type="default" size="middle" disabled>
                Add new series
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
    </div>
  )
}

export default AddBookForm
