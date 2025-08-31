import { mainImage } from 'assets'
import { ChartAuthor, ChartBook, ChartYears } from 'components'
import s from './Home.module.scss'

export const Home = () => {
  return (
    <div className={s.wrapper}>
      <img src={mainImage} alt="main section" />
      <div className={s.pieWrapper}>
        <ChartBook />
        <ChartAuthor />
      </div>
      <ChartYears />
    </div>
  )
}
