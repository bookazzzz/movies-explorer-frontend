import { useState, useEffect } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth ?? 0,
          height: window.innerHeight ?? 0,
        })
      }


      window.addEventListener('resize', handleResize)


      handleResize()


      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  return windowSize
}