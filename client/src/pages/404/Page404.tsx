import { FC } from 'react'
import { Link } from 'react-router-dom'
import { NotFound404Img } from 'assets'
import s from './Page404.module.scss'

const Page404: FC = () => {
  return (
    <div className={s.wrapper}>
      <img src={NotFound404Img} alt="404" />
      <Link to="/" className={s.link}>
        Go to home
      </Link>
    </div>
  )
}

export default Page404
