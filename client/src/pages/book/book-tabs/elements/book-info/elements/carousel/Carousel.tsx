/* eslint-disable import/no-extraneous-dependencies */
import { useState, useRef, type RefObject } from 'react'
import SlickSlider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Slider as AntdSlider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Card } from 'UI'
import { settings, GetSlidesToShow } from './utils'
import type { SerieBooks } from 'types'
import s from './Carousel.module.scss'

// @ts-ignore
const SliderComponent = SlickSlider.default || SlickSlider

export const Carousel = (props: SerieBooks) => {
  const { booksInSeries, title } = props
  const [slideIndex, setSlideIndex] = useState(0)
  const slidesToShow = GetSlidesToShow()

  const navigate = useNavigate()
  const sliderRef: RefObject<SlickSlider | null> = useRef(null)

  const handleClick = (id?: string) => {
    const path = window.location.pathname.split('/').at(1)
    navigate(`/${path}/${id}`)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{title}</div>

      <SliderComponent
        {...settings}
        beforeChange={(_oldIndex: number, newIndex: number) => setSlideIndex(newIndex)}
        className={s.carouselContainer}
        ref={sliderRef}>
        {booksInSeries.map((item) => {
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
      </SliderComponent>
      {booksInSeries.length > slidesToShow && (
        <AntdSlider
          defaultValue={0}
          value={slideIndex}
          min={0}
          max={booksInSeries.length - slidesToShow}
          tooltip={{ formatter: null }}
          onChange={(value) => sliderRef?.current?.slickGoTo(value)}
        />
      )}
    </div>
  )
}
