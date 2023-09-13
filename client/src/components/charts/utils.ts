export const COLORS = [
  '#1F77B4',
  '#AEC7E8',
  '#17BECF',
  '#9EDAE5',
  '#63707D',
  '#BDBDBD',
  '#393939',
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
