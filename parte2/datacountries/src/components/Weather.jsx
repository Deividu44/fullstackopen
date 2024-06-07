import axios from 'axios'
import { useEffect, useState } from 'react'

function Weather ({ name }) {
  const [weatherData, setWeatherData] = useState([])
  const appid = import.meta.env.VITE_APPID
  const weather_url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${appid}`

  useEffect(() => {
    console.log(weather_url)
    axios.get(weather_url)
      .then(res => {
        const data = [{
          temperature: res.data.main.temp,
          icon_name: res.data.weather[0].icon,
          icon_description: res.data.weather.description,
          name_country: res.data.name,
          wind: res.data.wind.speed

        }]
        setWeatherData(data)
      })
  }, [])

  return (
    <>
      {weatherData.map(w => (
        <div key={w.name}>
          <h2>Weather in {w.name_country}</h2>
          <p>Temperature {Math.floor(w.temperature - 273)}º Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${w.icon_name}@2x.png`}
            alt={w.icon_description}
          />
          <p>Wind: {w.wind}</p>
        </div>

      ))}
    </>
  )
}

export default Weather
