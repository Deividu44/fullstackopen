import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import OneCountry from './components/OneCountry'
import countriesServices from './services/countries'

function App () {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState([])

  
  const sliceTen = search.length > 10
    ? <li>Too many matches, specify another filter</li>
    : <Filter search={search.slice(0, 10)} />

  const searchFilter = search.length === 1
    ? <OneCountry search={search} />
    : sliceTen

  useEffect(() => {
    if (value) {
      countriesServices.getAll()
        .then(allCountries => {
          const fullCountries = allCountries.map(c => c.name.common)
          const nameCountries = fullCountries.filter(c => c.toLowerCase().includes(value.toLowerCase()))
          setSearch(nameCountries)
        })
    }
  }, [value])

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  return (
    <div>
      <h1>Welcome to data about countries</h1>
      Find countries<input type='search' value={value} onChange={handleChange} />
      <div>
        {search.length === 0 || value === ''
          ? <p>Type country that exists</p>
          : searchFilter} {search.length}
      </div>
    </div>
  )
}

export default App
