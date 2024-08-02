export const getCountColor = (count: number) => {
  if (count >= 10) {
    return '#892e8a'
  } else if (count > 4 && count < 10) {
    return '#1F77B4'
  } else if (count === 4) {
    return '#17BECF'
  } else if (count === 3) {
    return 'lime'
  } else if (count === 2) {
    return 'yellow'
  }
}
