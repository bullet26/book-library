import { FC, useState } from 'react'
import { Formik, Form } from 'formik'
import { Button, Rate } from 'antd'
import { BookInput } from 'types'
import { SearchInForm } from 'components'
import { TextareaInput, DatepickerInput, Input } from 'UI'
import { initialValuesAddBook, validationSchemaAddBook } from '../utils'
import s from '../Form.module.scss'

interface AddBookFormProps {
  handleClickAuthorBtn: () => void
  isShowAuthorForm: boolean
  onSubmitRequest: (values: BookInput) => void
}

const AddBookForm: FC<AddBookFormProps> = (props) => {
  const windoowWidth = window.innerWidth
  const { handleClickAuthorBtn, isShowAuthorForm: isShowAuyhorForm, onSubmitRequest } = props
  const dateFormat = 'YYYY-MM-DD'
  const [rating, setRating] = useState(0)

  const formatTextforDB = (fieldValue: string | null) => {
    if (fieldValue) {
      return fieldValue.replace(/\n\s*\n/g, '<br>')
    }
    return null
  }

  return (
    <div className={s.addFormWrapper}>
      <div className={s.title}>Add read book</div>
      <Formik
        initialValues={initialValuesAddBook}
        validationSchema={validationSchemaAddBook}
        onSubmit={(values, { resetForm }) => {
          const { author, series, plot, description, readEnd, ...filteredValues } = values

          onSubmitRequest({
            ...filteredValues,
            rating,
            plot: formatTextforDB(plot),
            description: formatTextforDB(description),
            readEnd: readEnd?.format(dateFormat),
          })
          resetForm()
          setRating(0)
        }}>
        <Form className={s.form}>
          <Input placeholder="Book title" name="title" />
          <div className={s.innerWrapper}>
            <div className={s.flexGrowItem}>
              <SearchInForm type="authors" />
            </div>
            {windoowWidth > 582 && (
              <div className={s.flexItem}>
                <Button type="default" size="middle" onClick={handleClickAuthorBtn}>
                  {isShowAuyhorForm ? 'Hide author form' : 'Add new author'}
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
            {windoowWidth > 582 && (
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
          <TextareaInput placeholder="Book annotation (description)" name="description" />
          <TextareaInput placeholder="Book plot description" name="plot" />

          {windoowWidth < 582 && (
            <div className={s.innerWrapper}>
              <Button type="default" size="middle" disabled>
                Add new series
              </Button>
              <Button type="default" size="middle" onClick={handleClickAuthorBtn}>
                {isShowAuyhorForm ? 'Hide author form' : 'Add new author'}
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
