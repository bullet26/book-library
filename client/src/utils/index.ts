import DOMPurify from 'dompurify'
import { unknownAuthor1, unknownAuthor2 } from 'assets'

export const colorRate = (rating: number) => {
  const iconColor = {
    good: '#64c80a',
    mid: '#fd9b27',
    bad: '#ff5032',
    unknown: '#95979e',
  }

  if (rating >= 4) {
    return iconColor.good
  }
  if (rating <= 2 && rating > 0) {
    return iconColor.bad
  }
  if (rating > 2 && rating < 4) {
    return iconColor.mid
  }
  return iconColor.unknown
}

export const sanitize = (dirtyText: string): TrustedHTML | string => {
  return DOMPurify.sanitize(dirtyText, { USE_PROFILES: { html: true } })
}

export const getRandomImage = () => {
  const images = [unknownAuthor1, unknownAuthor2]
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}
