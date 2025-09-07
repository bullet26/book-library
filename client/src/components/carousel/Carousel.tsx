/* eslint-disable import/no-extraneous-dependencies */
import { useState, useRef, type RefObject } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Slider as InputRange } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import type { Book } from '__graphql/__generated__/graphql'
import { settings, GetSlidesToShow } from './utils'
import s from './Carousel.module.scss'

interface CarouselProps {
  title: string
  data: Book[]
}

export const Carousel = (props: CarouselProps) => {
  const { data, title } = props
  const [slideIndex, setSlideIndex] = useState(0)
  const slidesToShow = GetSlidesToShow()

  const navigate = useNavigate()
  const sliderRef: RefObject<Slider | null> = useRef(null)

  const handleClick = (id?: string) => {
    const path = window.location.pathname.split('/').at(1)
    navigate(`/${path}/${id}`)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{title}</div>

      <Slider
        {...settings}
        beforeChange={(_, next) => setSlideIndex(next)}
        className={s.carouselContainer}
        ref={sliderRef}>
        {data.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              type="small"
              img={item.bookCoverThumbnail}
              rating={item.rating}
              title={item.title}
              onClick={handleClick}
            />
          )
        })}
      </Slider>
      {data.length > slidesToShow && (
        <InputRange
          defaultValue={0}
          value={slideIndex}
          min={0}
          max={data.length - slidesToShow}
          tooltip={{ formatter: null }}
          onChange={(value) => sliderRef?.current?.slickGoTo(value)}
        />
      )}
    </div>
  )
}
