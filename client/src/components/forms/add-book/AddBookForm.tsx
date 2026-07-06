import { useForm, Controller, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'antd'
import dayjs from 'dayjs'
import { useMutation } from '@apollo/client/react'
import { CREATE_BOOK } from '__graphql'
import { TextEditor, Modal, Error } from 'UI'
import {
  DatePickerControlled,
  DropZoneControlled,
  NumberInputControlled,
  RateControlled,
  SearchDropdownControlled,
  TextEditorControlled,
  TextInputControlled,
} from '../elements'
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

  const dateFormat = 'YYYY-MM-DD'

  const [createBookApollo, { data, error, loading }] = useMutation(CREATE_BOOK)

  const methods = useForm({
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

    methods.reset()
  }

  return (
    <div>
      <div className={s.title}>Add read book</div>

      <FormProvider {...methods}>
        <form
          className={isShowAuthorForm ? s.addBookFormWrapperOneColumn : s.addBookFormWrapper}
          onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={s.form}>
            <TextInputControlled name="title" placeholder="Book title" />

            <div className={s.innerWrapper}>
              <div className={s.flexGrowItem}>
                <SearchDropdownControlled name="authorID" />
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
              <RateControlled name="rating" />

              <div className={s.flexGrowItem}>
                <DatePickerControlled name="readEnd" style={{ width: '100%' }} />
              </div>
            </div>

            <div className={s.innerWrapper}>
              <div className={s.flexGrowItem}>
                <SearchDropdownControlled name="seriesID" />
              </div>

              <div className={s.flexItem}>
                <NumberInputControlled
                  name="seriesNumber"
                  placeholder="Book series number"
                  style={{
                    width: '100%',
                  }}
                />
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
                <NumberInputControlled
                  name="pages"
                  placeholder="Book pages"
                  style={{
                    width: '100%',
                  }}
                />
              </div>

              <div className={s.flexGrowItem}>
                <TextInputControlled name="notes" placeholder="Book notes" />
              </div>
            </div>

            <TextEditorControlled name="description" placeholder="Book annotation" />
            <TextEditorControlled name="plot" editOptions placeholder="Book plot description" />

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

          {!isShowAuthorForm && <DropZoneControlled name="bookCover" />}
        </form>
      </FormProvider>

      {!!data && (
        <Modal
          content={`book ${data.bookInfo.title} was created, author - ${data.bookInfo.author.name} ${data.bookInfo.author.surname} `}
        />
      )}
      {!!error && <Error />}
    </div>
  )
}
