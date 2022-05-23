import React, { useState } from 'react'

console.log(useState)

const Hello = () => {
  const [number, setNumber] = useState(0)

  const handleClick = () => {
    setNumber((n) => n + 1)
  }

  return (
    <>
      <div onClick={handleClick}></div>
      <div>Title</div>
      <p>{number}</p>
    </>
  )
}

export default Hello
