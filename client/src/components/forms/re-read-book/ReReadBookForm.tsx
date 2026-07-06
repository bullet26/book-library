import { Button } from 'antd'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { type ReadDateInput } from '__graphql/__generated__/graphql'
import { DatePickerControlled, SearchDropdownControlled } from '../elements'
import {
  ReReadBookInitialValues,
  ReReadBookValidationSchema,
  type ReReadBookFormType,
} from '../utils'
import s from '../Form.module.scss'

interface ReReadBookFormProps {
  disabled?: boolean
  onSubmitRequest: (values: ReadDateInput) => void
}

const dateFormat = 'YYYY-MM-DD'

export const ReReadBookForm = (props: ReReadBookFormProps) => {
  const { onSubmitRequest, disabled } = props

  const methods = useForm<ReReadBookFormType>({
    defaultValues: ReReadBookInitialValues,
    resolver: yupResolver(ReReadBookValidationSchema),
  })

  const onSubmit = (values: ReReadBookFormType) => {
    const { readEnd, bookID } = values

    if (readEnd && bookID) {
      onSubmitRequest({ bookID, readEnd: dayjs(readEnd).format(dateFormat) })
    }

    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <form className={s.formReread} onSubmit={methods.handleSubmit(onSubmit)}>
        <SearchDropdownControlled name="bookID" />
        <DatePickerControlled name="readEnd" />

        <Button
          className={s.submitBtn}
          type="primary"
          size="large"
          htmlType="submit"
          disabled={disabled}>
          ADD REREADING DATE
        </Button>
      </form>
    </FormProvider>
  )
}
