import { Button, DatePicker } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { SearchInForm } from 'components'
import { type ReadDateInput } from '__graphql/__generated__/graphql'
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

const visualizationDateFormat = 'DD/MM/YYYY'
const dateFormat = 'YYYY-MM-DD'

export const ReReadBookForm = (props: ReReadBookFormProps) => {
  const { onSubmitRequest, disabled } = props

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReReadBookFormType>({
    defaultValues: ReReadBookInitialValues,
    resolver: yupResolver(ReReadBookValidationSchema),
  })

  const onSubmit = (values: ReReadBookFormType) => {
    const { readEnd, bookID } = values

    if (readEnd && bookID) {
      onSubmitRequest({ bookID, readEnd: dayjs(readEnd).format(dateFormat) })
    }

    reset()
  }

  return (
    <form className={s.formReread} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="bookID"
        control={control}
        render={({ field, fieldState }) => (
          <SearchInForm {...field} status={fieldState.error && 'error'} />
        )}
      />
      {errors.bookID && <div className={s.error}>{errors.bookID.message}</div>}

      <Controller
        name="readEnd"
        control={control}
        render={({ field: { value, onChange, ...fields }, fieldState }) => (
          <DatePicker
            {...fields}
            value={value ? dayjs(value) : null}
            onChange={(date) => onChange(date)}
            format={visualizationDateFormat}
            status={fieldState.error ? 'error' : ''}
          />
        )}
      />
      {errors.readEnd && <div className={s.error}>{errors.readEnd.message}</div>}

      <Button
        className={s.submitBtn}
        type="primary"
        size="large"
        htmlType="submit"
        disabled={disabled}>
        ADD REREADING DATE
      </Button>
    </form>
  )
}
