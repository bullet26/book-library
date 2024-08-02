import { FC } from 'react'
import { Card as AtntCard, Tooltip } from 'antd'
import { Book } from 'assets'
import { Rating } from 'UI'
import s from './Card.module.scss'

interface CardProps {
  type: 'small' | 'book' | 'author'
  img: string
  title: string
  subtitle?: string
  id?: string
  rating?: number
  onClick: (id?: string) => void
}

const { Meta } = AtntCard

const Card: FC<CardProps> = (props) => {
  const { img, title, subtitle, onClick, id, type, rating = 0 } = props

  const bookCover = img ? <img alt="book cover" src={img} /> : <Book height={215} />

  return (
    <>
      {type === 'small' && (
        <Tooltip placement="rightTop" title={title}>
          <AtntCard
            hoverable
            className={s.smallWrpper}
            cover={bookCover}
            onClick={() => onClick(id)}>
            <Rating rating={rating} type="circle-only" style={{ bottom: '5px', top: 'auto' }} />
          </AtntCard>
        </Tooltip>
      )}
      {type === 'author' && (
        <AtntCard hoverable className={s.wrapper} cover={bookCover} onClick={() => onClick(id)}>
          <Tooltip placement="rightTop" title={title}>
            <Meta title={title} description={subtitle} />
          </Tooltip>
        </AtntCard>
      )}
      {type === 'book' && (
        <AtntCard hoverable className={s.wrapper} cover={bookCover} onClick={() => onClick(id)}>
          <Rating rating={rating} type="circle-only" />
          <Tooltip placement="rightTop" title={title}>
            <Meta title={title} description={subtitle} />
          </Tooltip>
        </AtntCard>
      )}
    </>
  )
}

export default Card
