import { FC } from 'react'
import { Card as AtntCard, Tooltip } from 'antd'
import { Book } from 'assets'
import s from './Card.module.scss'

interface CardProps {
  type?: 'small' | 'ordinry'
  img: string
  title: string
  subtitle?: string
  id?: string
  onClick: (id?: string) => void
}

const { Meta } = AtntCard

const Card: FC<CardProps> = (props) => {
  const { img, title, subtitle, onClick, id, type = 'ordinry' } = props

  const bookCover = img ? <img alt="book cover" src={img} /> : <Book height={215} />

  return type === 'small' ? (
    <Tooltip placement="rightTop" title={title}>
      <AtntCard hoverable className={s.smallWrpper} cover={bookCover} onClick={() => onClick(id)} />
    </Tooltip>
  ) : (
    <AtntCard hoverable className={s.wrapper} cover={bookCover} onClick={() => onClick(id)}>
      <Tooltip placement="rightTop" title={title}>
        <Meta title={title} description={subtitle} />
      </Tooltip>
    </AtntCard>
  )
}

export default Card
