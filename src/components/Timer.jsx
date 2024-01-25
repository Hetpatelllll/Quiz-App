import React, { useEffect, useState } from 'react'               

const Timer = ({ setStop, qustionno }) => {

  const [timer, setTimer] = useState(3)


  useEffect(() => {

    if (timer === 0) {
      return setStop(true)
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    // clear useeffect function
    return () => clearInterval(interval)
  }, [setStop, timer])

  useEffect(() => {
    setTimer(30);
  }, [qustionno])

  return (
    timer
  )
}

export default Timer