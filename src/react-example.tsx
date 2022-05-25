/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState } from 'react'
import { sleep } from './utils/ts-utils'

console.log(useState)
await sleep(1000)

const PillSelector: React.FC = () => {
  const [pill, setPill] = useState<'blue' | 'red' | undefined>('blue')

  return (
    <>
      <button onClick={() => setPill('red')}>Red pill</button>
      <button onClick={() => setPill('blue')}>Blue pill</button>
      <span>You chose {pill} pill!</span>
    </>
  )
}

export default PillSelector
