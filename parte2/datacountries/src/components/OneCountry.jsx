import { useEffect, useState } from 'react'
import Weather from './Weather'
import countriesServices from '../services/countries'

const OneCountry = ({ search }) => {
  const [oneCountry, setOneCountry] = useState([])

  useEffect(() => {
    countriesServices.getOne(search)
      .then(res => {
        const countryInfo = [{
          name: res.name.common,
          languages: res.languages,
          capital: res.capital.join(),
          area: res.area,
          flagInfo: res.flags
        }]
        setOneCountry(countryInfo)
      })
  }, [search])

  return (
    <>
      {oneCountry.map(o => (
        <div key={o.name}>
          <h1>{o.name}</h1>
          <p>Capital: {o.capital}</p>
          <p>Area: {o.area}</p>
          <h3>Languages:</h3>
          {Object.values(o.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
          <img src={o.flagInfo.png} alt={o.flagInfo.alt} />
        </div>
      ))}
      <Weather name={search} />
    </>
  )
}

export default OneCountry
