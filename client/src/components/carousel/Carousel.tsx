import { FC } from 'react'
import CarouselReact from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { Book } from 'types'
import { responsive } from './utils'
import s from './Carousel.module.scss'

interface CarouselProps {
  title: string
  data: Book[]
}

const Carousel: FC<CarouselProps> = (props) => {
  const { data, title } = props

  const navigte = useNavigate()

  const handleClick = (id?: string) => {
    const path = window.location.pathname.split('/').at(1)
    navigte(`/${path}/${id}`)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{title}</div>
      <CarouselReact
        arrows={false}
        keyBoardControl
        showDots
        renderDotsOutside
        draggable
        responsive={responsive}
        containerClass={s.carouselContainer}
        dotListClass={s.dotListClass}>
        {data.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              type="small"
              img={item.bookCover}
              title={item.title}
              onClick={handleClick}
            />
          )
        })}
      </CarouselReact>
    </div>
  )
}

export default Carousel
