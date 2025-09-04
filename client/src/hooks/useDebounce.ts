import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay = 800) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const debounce = setTimeout(() => {
      // можно проверку добавить if (!value) {...}
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(debounce)
    }
  }, [value, delay])

  return debouncedValue
}
