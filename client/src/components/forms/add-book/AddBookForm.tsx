import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, DatePicker, Rate, Input, InputNumber } from 'antd'
import dayjs from 'dayjs'
import { useMutation } from '@apollo/client/react'
import { CREATE_BOOK } from '__graphql'
import { SearchInForm } from 'components'
import { TextEditor, Modal, Error, DropZone } from 'UI'
import { AddBookInitialValues, AddBookValidationSchema, type AddBookFormType } from '../utils'
import s from '../Form.module.scss'

interface AddBookFormProps {
  handleClickAuthorBtn: () => void
  isShowAuthorForm: boolean
  handleClickSerieBtn: () => void
  isShowSerieForm: boolean
}

export const AddBookForm = (props: AddBookFormProps) => {
  const { handleClickAuthorBtn, isShowAuthorForm, isShowSerieForm, handleClickSerieBtn } = props

  const windowWidth = window.innerWidth
  const MOBILE_WIDTH_THRESHOLD = 582

  const visualizationDateFormat = 'DD/MM/YYYY'
  const dateFormat = 'YYYY-MM-DD'

  const [createBookApollo, { data, error, loading }] = useMutation(CREATE_BOOK)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: AddBookInitialValues,
    resolver: yupResolver(AddBookValidationSchema),
  })

  const onSubmit = (values: AddBookFormType) => {
    const bookCoverThumbnail =
      values.bookCover?.replace(/\/upload\//, '/upload/c_thumb,w_218,h_323/') || null

    createBookApollo({
      variables: {
        input: {
          ...values,
          title: values.title.trim(),
          seriesID: values.seriesID || null,
          readEnd: dayjs(values.readEnd).format(dateFormat),
          bookCoverThumbnail,
        },
      },
    })

    reset()
  }

  return (
    <div>
      <div className={s.title}>Add read book</div>

      <form
        className={isShowAuthorForm ? s.addBookFormWrapperOneColumn : s.addBookFormWrapper}
        onSubmit={handleSubmit(onSubmit)}>
        <div className={s.form}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder="Book title"
                style={{ ...(fieldState.error && { border: '1px solid red' }) }}
              />
            )}
          />
          {errors.title && <div className={s.error}>{errors.title.message}</div>}

          <div className={s.innerWrapper}>
            <div className={s.flexGrowItem}>
              <Controller
                name="authorID"
                control={control}
                render={({ field, fieldState }) => (
                  <SearchInForm {...field} status={fieldState.error && 'error'} />
                )}
              />
              {errors.authorID && <div className={s.error}>{errors.authorID.message}</div>}
            </div>

            {windowWidth > MOBILE_WIDTH_THRESHOLD && (
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

              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rate {...field} allowHalf style={{ width: '200px', color: '#9E339F' }} />
                )}
              />
              {errors.rating && <div className={s.error}>{errors.rating.message}</div>}
            </div>

            <div className={s.flexGrowItem}>
              <Controller
                name="readEnd"
                control={control}
                render={({ field: { value, onChange, ...fields }, fieldState }) => (
                  <DatePicker
                    {...fields}
                    value={value ? dayjs(value) : null}
                    onChange={(date) => onChange(date)}
                    format={visualizationDateFormat}
                    status={fieldState.error && 'error'}
                    style={{ width: '100%' }}
                  />
                )}
              />
              {errors.readEnd && <div className={s.error}>{errors.readEnd.message}</div>}
            </div>
          </div>

          <div className={s.innerWrapper}>
            <div className={s.flexGrowItem}>
              <Controller
                name="seriesID"
                control={control}
                render={({ field, fieldState }) => (
                  <SearchInForm {...field} status={fieldState.error && 'error'} />
                )}
              />
              {errors.seriesID && <div className={s.error}>{errors.seriesID.message}</div>}
            </div>

            <div className={s.flexItem}>
              <Controller
                name="seriesNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <InputNumber
                    {...field}
                    type="number"
                    placeholder="Book series number"
                    controls={false}
                    style={{ width: '100%', ...(fieldState.error && { border: '1px solid red' }) }}
                  />
                )}
              />
              {errors.seriesNumber && <div className={s.error}>{errors.seriesNumber.message}</div>}
            </div>

            {windowWidth > MOBILE_WIDTH_THRESHOLD && (
              <div className={s.flexItem}>
                <Button type="default" size="middle" onClick={handleClickSerieBtn}>
                  {isShowSerieForm ? 'Hide serie form' : 'Add new serie'}
                </Button>
              </div>
            )}
          </div>

          <div className={s.innerWrapper}>
            <div className={s.flexGrowItem}>
              <Controller
                name="pages"
                control={control}
                render={({ field, fieldState }) => (
                  <InputNumber
                    {...field}
                    type="number"
                    placeholder="Book pages"
                    controls={false}
                    style={{ width: '100%', ...(fieldState.error && { border: '1px solid red' }) }}
                  />
                )}
              />
              {errors.pages && <div className={s.error}>{errors.pages.message}</div>}
            </div>

            <div className={s.flexGrowItem}>
              <Controller
                name="notes"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    placeholder="Book notes"
                    style={{ ...(fieldState.error && { border: '1px solid red' }) }}
                  />
                )}
              />
              {errors.notes && <div className={s.error}>{errors.notes.message}</div>}
            </div>
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextEditor
                {...field}
                style={{ ...(fieldState.error && { border: '1px solid red' }) }}
                placeholder="Book annotation"
              />
            )}
          />
          {errors.description && <div className={s.error}>{errors.description.message}</div>}

          <Controller
            name="plot"
            control={control}
            render={({ field, fieldState }) => (
              <TextEditor
                {...field}
                editOptions={{ color: true, bold: true, italic: true }}
                style={{ ...(fieldState.error && { border: '1px solid red' }) }}
                placeholder="Book plot description"
              />
            )}
          />
          {errors.plot && <div className={s.error}>{errors.plot.message}</div>}

          {windowWidth < MOBILE_WIDTH_THRESHOLD && (
            <div className={s.innerWrapper}>
              <Button type="default" size="middle" onClick={handleClickSerieBtn}>
                {isShowSerieForm ? 'Hide serie form' : 'Add new serie'}
              </Button>
              <Button type="default" size="middle" onClick={handleClickAuthorBtn}>
                {isShowAuthorForm ? 'Hide author form' : 'Add new author'}
              </Button>
            </div>
          )}

          <Button
            className={s.submitBtn}
            type="primary"
            size="large"
            htmlType="submit"
            disabled={loading}>
            ADD BOOK
          </Button>
        </div>

        {!isShowAuthorForm && (
          <>
            <Controller
              name="bookCover"
              control={control}
              render={({ field }) => <DropZone {...field} status={!isShowAuthorForm} />}
            />
            {errors.bookCover && <div className={s.error}>{errors.bookCover.message}</div>}
          </>
        )}
      </form>

      {!!data && (
        <Modal
          content={`book ${data.bookInfo.title} was created, author - ${data.bookInfo.author.name} ${data.bookInfo.author.surname} `}
        />
      )}
      {!!error && <Error />}
    </div>
  )
}
