import Image from 'next/image'
import React, { useEffect, useState} from 'react'
import { WeatherData } from '../types/types'

export default function WeatherCity({dataCity, fetching} : {dataCity: WeatherData[], fetching:boolean}) {
  const [fadeData, setFadeData] = useState({fade: ''})

  //Getting the date in the UTC timezone, depending on the city
  const getCurrentDay = (currentTimezone: number) => {
    const timezone = (currentTimezone * 1000)
    const today = new Date((new Date().getTime() + timezone))
    const newDate = today.toLocaleDateString('locale', {
      timeZone: 'UTC',
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    return newDate
  }

  //Getting the time in the UTC timezone, depending on the city
  const getCurrentTime = (currentTimezone: number) => {
    const timezone = (currentTimezone * 1000)
    const time = new Date((new Date().getTime() + timezone))
    const currentTime = time.toLocaleString('locale', {
      timeZone:'UTC',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
  })
    
    return currentTime
  }

  //Manage the fade in/out between fetching new data
  useEffect(() => {
    if(fetching === true) {
      setFadeData({fade: 'fade-out'})
    }else {
      setFadeData({fade: 'fade-in'})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching])

  return (
    <div className="px-3 pt-3 relative">
        {/* Until we have data store in our variable, we show nothing */}
        {dataCity.length === 0 ? (''):(
        dataCity.map((wd) => (
          <div key={wd.id} className="flex flex-row flex-wrap items-start">
            <p className={`${fadeData.fade} w-full cn-semibo text-3xl sm:text-4xl text-king-blue`}>{wd.name}, {wd.sys.country}</p>
            <div className={`${fadeData.fade} flex justify-between w-full items-start`}>
              <div className='flex flex-col sm:flex-row mt-3 gap-x-6'>
                <p className='text-5xl sm:text-6xl mb-2'>{getCurrentTime(wd.timezone)}</p>
                <p className='cn-thin text-lg text-night-forest opacity-50'>
                  <span className='block'>{getCurrentDay(wd.timezone)}</span>
                  <span className=''>{wd.weather[0].description}</span>
                </p>
              </div>
              <div className='flex flex-wrap justify-end mt-3 gap-x-4 sm:gap-x-6'>
                <div>
                  <h4 className='text-5xl sm:text-6xl mb-2 sm:mb-0'>{wd.main.temp.toFixed(0)}°c</h4>
                </div>
                <p className='relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]'>
                  <Image 
                    src={`/weatherIcons/${wd.weather[0].icon}@2x.png`} 
                    alt={`${wd.weather[0].icon}`}
                    layout="fill"
                    className='object-contain'
                  />
                </p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Temp min</th>
                  <th>Temp max</th>
                  <th>Pression</th>
                  <th>Wind</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`${fadeData.fade}`}>
                  <td>{wd.main.temp_min.toFixed(2)}°c</td>
                  <td>{wd.main.temp_max.toFixed(2)}°c</td>
                  <td>{wd.main.pressure}hPa</td>
                  <td>{wd.wind.speed}m/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  )
}