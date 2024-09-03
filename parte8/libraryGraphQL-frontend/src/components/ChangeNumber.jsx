import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { CHANGE_BIRTH, query } from "../../queries"
import Select from 'react-select'

function ChangeNumber ({ setError, authors }) {

  const options = authors.map(a => {    
   return { 
    value: a,
    label: a
   }
  })
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [ changeBirth, result ] = useMutation(CHANGE_BIRTH, {
    refetchQueries: [{query: query}]
  })

  const handleSubmit = e => {
    e.preventDefault()
    
    if(selectedOption.value === '') { return setError('Name must be type') }
    changeBirth({ variables: { name: selectedOption.value, setBornTo: Number(born) }})

    setSelectedOption('')
    setBorn('')
  }

  useEffect(() => {
    
    if(result.data && result.data.editAuthor === null) setError('Author not found')
  }, [result.data])

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <Select
             defaultValue={selectedOption}
             onChange={setSelectedOption}
             options={options} />
        </div>
        <div>
          <label>
            Born: 
            <input
             type="text"
             value={born}
             onChange={({ target }) => setBorn(target.value)}
             />
          </label>
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default ChangeNumber
