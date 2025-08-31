import { Card as AntdCard, Badge, Tooltip } from 'antd'
import { Book } from 'assets'
import { Rating } from 'UI'
import { getCountColor } from './utils'
import s from './Card.module.scss'

interface CardProps {
  type: 'small' | 'book' | 'author'
  img: string
  title: string
  subtitle?: string
  id?: string
  rating?: number
  count?: number
  onClick: (id?: string) => void
}

const { Meta } = AntdCard

export const Card = (props: CardProps) => {
  const { img, title, subtitle, onClick, id, type, rating = 0, count } = props

  const bookCover = img ? <img alt="book cover" src={img} /> : <Book height={215} />

  return (
    <>
      {type === 'small' && (
        <Tooltip placement="rightTop" title={title}>
          <AntdCard
            hoverable
            className={s.smallWrpper}
            cover={bookCover}
            onClick={() => onClick(id)}>
            <Rating rating={rating} type="circle-only" style={{ bottom: '5px', top: 'auto' }} />
          </AntdCard>
        </Tooltip>
      )}
      {type === 'author' &&
        (count ? (
          <Badge count={count} color={getCountColor(count)}>
            <AntdCard hoverable className={s.wrapper} cover={bookCover} onClick={() => onClick(id)}>
              <Tooltip placement="rightTop" title={title}>
                <Meta title={title} description={subtitle} />
              </Tooltip>
            </AntdCard>
          </Badge>
        ) : (
          <AntdCard hoverable className={s.wrapper} cover={bookCover} onClick={() => onClick(id)}>
            <Tooltip placement="rightTop" title={title}>
              <Meta title={title} description={subtitle} />
            </Tooltip>
          </AntdCard>
        ))}
      {type === 'book' && (
        <AntdCard hoverable className={s.wrapper} cover={bookCover} onClick={() => onClick(id)}>
          <Rating rating={rating} type="circle-only" />
          <Tooltip placement="rightTop" title={title}>
            <Meta title={title} description={subtitle} />
          </Tooltip>
        </AntdCard>
      )}
    </>
  )
}
