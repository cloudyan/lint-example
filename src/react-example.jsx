import { useState } from 'react'
import { sleep } from './utils/utils'

console.log(useState)
await sleep(1000)

function Hello() {
  const [number, setNumber] = useState(0)

  const handleClick = () => {
    setNumber((n) => n + 1)
  }

  return (
    <>
      <div onClick={handleClick} />
      <div>Title</div>
      <p>{number}</p>
    </>
  )
}

export default Hello
