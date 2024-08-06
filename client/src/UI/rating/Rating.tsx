import { CSSProperties, FC } from 'react'
import { StarTwoTone } from '@ant-design/icons'
import { Tick } from 'assets'
import { colorRate } from 'utils'
import { makeArray } from './utils'
import s from './Rating.module.scss'

interface RatingProps {
  rating: number
  type: 'star' | 'circle-only'
  style?: CSSProperties
}

const Rating: FC<RatingProps> = (props) => {
  const { rating, type, style = {} } = props

  return (
    <>
      {type === 'star' && (
        <div className={s.wrapper} style={style}>
          <div className={s.ratingStar}>
            {makeArray(rating).map((item, i) => {
              return (
                <StarTwoTone twoToneColor={colorRate(rating)} style={{ fontSize: 40 }} key={i} />
              )
            })}
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

export default Rating
