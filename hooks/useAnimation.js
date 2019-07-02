import { useState, useEffect } from 'react'

export function useAnimation(duration, delay) {
  const elapsed = useAnimationTimer(duration, delay)
  const n = Math.min(1, elapsed / duration);
  return n => n;
}

const useAnimationTimer = (duration, delay) => {
  const [elapsed, setTime] = useState(0)

  useEffect(() => {
    let animationFrame, timerStop, start;

    const onFrame = () => {
      setTime(Date.now() - start)
      loop()
    }

    const loop = () => {
      animationFrame = requestAnimationFrame(onFrame)
    }

    const onStart = () => {
      timerStop = setTimeou(() => {
        cancelAnimationFrame(animationFrame)
        setTime(Date.now() - start)
      }, duration)

      start = Date.now()
      loop();
    }

      const timerDelay = setTimeou(onStart, delay);

      return () => {
        clearTimeout(timerStop)
        clearTimeout(timerDelay)
        cancelAnimationFrame(animationFrame)
      }
  }, [duration, delay])
}