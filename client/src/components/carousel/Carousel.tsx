/* eslint-disable import/no-extraneous-dependencies */
import { FC, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { Book } from 'types'
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

  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    className: s.carouselContainer,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 379,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{title}</div>
      <Slider {...settings}>
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
      </Slider>
    </div>
  )
}

export default Carousel
