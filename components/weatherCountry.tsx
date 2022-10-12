import React from 'react'
import { WeatherData } from '../types/types'

export default function WeatherCountry({dataCountry} : {dataCountry: WeatherData[]}) {
  return (
    <div className="mt-4">
      {dataCountry.length === 0 ? (''):(
        dataCountry.map((wd) => (
          <ul 
            key={wd.id}
            className="flex flex-col items-justify"
          >
            <li>{wd.name} - {wd.main.temp.toFixed(0)}°C</li>
          </ul>
        ))
      )}
    </div>
  )
}

