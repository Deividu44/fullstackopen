import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

function Filter () {
  const dispatch = useDispatch()

  const handleChange = e => {
    console.log(e.target.value)
    dispatch(changeFilter(e.target.value))
  }

  return (
    <div>
      Filter 
      <input 
        type="search"
        onChange={handleChange} />
    </div>
  )
}

export default Filter