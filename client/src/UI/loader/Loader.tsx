import { FC } from 'react'
import s from './Loader.module.scss'

const Loader: FC = () => {
  const liArr = Array(18).fill(1)

  return (
    <div className={s.wrapper}>
      <div className={s.book}>
        <div className={s.inner}>
          <div className={s.left} />
          <div className={s.middle} />
          <div className={s.right} />
        </div>
        <ul>
          {liArr.map((_, i) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i} />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Loader

//https://codepen.io/aaroniker/pen/zYOewEP - loader
