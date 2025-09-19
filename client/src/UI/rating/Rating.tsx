import { type CSSProperties } from 'react'
import { HeartFilled, StarFilled } from '@ant-design/icons'
import { Tick } from 'assets'
import { colorRate } from 'utils'
import s from './Rating.module.scss'
import { Rate } from 'antd'

interface RatingProps {
  rating: number
  type: 'star' | 'circle-only'
  style?: CSSProperties
}

export const Rating = (props: RatingProps) => {
  const { rating, type, style = {} } = props

  return (
    <>
      {type === 'star' && (
        <div className={s.wrapper} style={style}>
          <div className={s.ratingStar}>
            <Rate
              disabled
              defaultValue={rating}
              style={{ fontSize: 40, color: colorRate(rating) }}
              character={rating >= 4 ? <HeartFilled /> : <StarFilled />}
              allowHalf
              count={5}
            />
          </div>
          <div className={s.ratingCircle} style={{ backgroundColor: colorRate(rating) }}>
            {rating || <Tick fill="white" height="15px" />}
          </div>
        </div>
      )}
      {type === 'circle-only' && (
        <div className={s.wrapperCircleOnly} style={style}>
          <div className={s.ratingCircle} style={{ backgroundColor: colorRate(rating) }}>
            {rating || <Tick fill="white" height="15px" />}
          </div>
        </div>
      )}
    </>
  )
}
