import { useState } from 'react'
import OneCountry from './OneCountry'

const Filter = ({ search }) => {
  const [oneCountry, setOneCountry] = useState([])
  const [show, setShow] = useState(false)

  const handleShow = (c) => {
    setOneCountry(c)
    setShow(!show)
  }
  return (
    <ul>
      {search.map(c => (
        <li key={c}>{c}<button onClick={() => handleShow(c)}>Show</button></li>
      ))}
      {show &&
        <>
          <OneCountry search={oneCountry} />
        </>}
    </ul>
  )
}

export default Filter
