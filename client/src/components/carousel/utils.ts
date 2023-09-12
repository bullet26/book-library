export const settings = {
  arrows: false,
  infinite: false,
  dots: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
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

export const GetSlidesToShow = () => {
  const width = window.innerWidth

  if (width >= 600 && width < 920) {
    return 4
  }
  if (width < 600 && width >= 379) {
    return 3
  }
  if (width < 379) {
    return 2
  }
  return 6
}
