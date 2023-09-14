export const COLORS = [
  '#1F77B4',
  '#AEC7E8',
  '#17BECF',
  '#9EDAE5',
  '#63707D',
  '#BDBDBD',
  '#F9F9F9',
  '#7B7B7B',
  '#3182BD',
  '#6BAED6',
]

export const handleResponsive = () => {
  const windowWidth = window.innerWidth

  if (windowWidth >= 1920) {
    return { inner: 85, outer: 100 }
  }
  if (windowWidth < 1920 && windowWidth > 1200) {
    return { inner: 65, outer: 80 }
  }
  return { inner: 40, outer: 65 }
}

export const checkEmptyPeriod = (data: { period: string; count: number }[]) => {
  new Array(12).fill(1).map((_, i) => {
    if (data[i].period !== String(i + 1)) {
      return { period: i + 1, count: 0 }
    }
    return data[i]
  })
}
