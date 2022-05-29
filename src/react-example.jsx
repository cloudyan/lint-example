import { useState } from 'react';

console.log(useState);
// await sleep(1000)

function Hello() {
  const [number, setNumber] = useState(0);

  const handleClick = () => {
    setNumber((num) => num + 1);
  };

  return (
    <>
      <div onClick={handleClick} />
      <div>Title</div>
      <p>{number}</p>
    </>
  );
}

export default Hello;
