import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { WeatherDataDaily, WeatherDataDList } from '../types/types'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";

import { TbCalendarTime } from "react-icons/tb"

export default function WeatherCityDaily({dataCityDaily, fetching} : {dataCityDaily: WeatherDataDaily[], fetching:boolean}) {
  const [fadeData, setFadeData] = useState({fade: ''})

  const [weatherCDF, setWeatherCDF] = useState<WeatherDataDList[][]>([]);
  let weatherCD: (WeatherDataDList)[][] = [];
  let weatherDataD: (WeatherDataDList)[] = [];

  const [forecastDays, setForecastDays] = useState<string[]>([]);
  let forecastDaily: string[] = [];

  const [noWeatherData, setNoWeatherData] = useState<string[]>([]);
  const [firstSlide, setfirstSlide] = useState<number>(0);

  const filterWeatherCD = () => {
    setWeatherCDF([])
    setForecastDays([])
    setNoWeatherData([])

    dataCityDaily.map((dataCD, index) => {
      const dataLength = dataCityDaily[0].list.length - 1

      const timezoneOffset = (new Date().getTimezoneOffset()/60)*3600000;
      const timezoneUTC = (dataCD.city.timezone * 1000) + timezoneOffset

      let date_now = new Date(new Date().getTime() + timezoneUTC)
      let date_tmw = new Date(date_now).getDate() + 1
      let hour_daily: number

      dataCD.list.map((datalist, index) => {
        let date_checking = new Date(datalist.dt_txt)
        datalist.lastWD = false;
        hour_daily = new Date(datalist.dt_txt).getHours()

        //Checking so we can start the forecast a day after and not immediately
        if (date_tmw > date_checking.getDate()) {
          return
        }

        //Pass the forecast data depending on these specific hours
        if ((date_tmw === date_checking.getDate())) {
          if((hour_daily === 9) || (hour_daily === 15) || (hour_daily === 21)) {
            weatherDataD.push(datalist)
          }
        }else{
          if (hour_daily === 0) {
            date_tmw = date_checking.getDate()
            weatherCD = [...weatherCD, weatherDataD]
            setWeatherCDF(weatherCD)
            weatherDataD = []
            forecastDaily.push(new Date(datalist.dt_txt).toLocaleString('locale', { timeZone:'UTC', weekday: 'short', day: 'numeric' }))
            setForecastDays(forecastDaily)
          }
        }

        //Manage how we display the last day of the forecast
        if (dataLength - index === 0) {
          datalist.lastWD = true;
          if ( date_checking.getHours() < 8) {
            return
          }else if ((date_checking.getHours() >= 9) && (date_checking.getHours() < 14)) {
            const nwd = ["/", "/"] 
            setNoWeatherData(nwd)
          }else if ((date_checking.getHours() >= 15) && (date_checking.getHours() < 20)) {
            const nwd = ["/"] 
            setNoWeatherData(nwd)
          }
          weatherCD = [...weatherCD, weatherDataD]
          setWeatherCDF(weatherCD)
          weatherDataD = []
          forecastDaily.push(new Date(datalist.dt_txt).toLocaleString('locale', { timeZone:'UTC', weekday: 'short', day: 'numeric' }))
          setForecastDays(forecastDaily)
        }
      })
    })
  }

  //Reload data based on new dataCityDaily's data we get
  //Also reseting variables
  //Setting up our left and right nav button
  useEffect(() => {
    filterWeatherCD()
    if(dataCityDaily.length === 0) {
      setWeatherCDF([])
      setForecastDays([])
      setNoWeatherData([])
      setfirstSlide(0)
    }
    navBtn()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCityDaily])

  //Manage the fade in/out between fetching new data
  useEffect(() => {
    if(fetching === true) {
      setFadeData({fade: 'fade-out'})
    }else {
      setFadeData({fade: 'fade-in'})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching])
  
  const navBtn = () => {
    const prevBtn = document.querySelector('.swiper-button-prev') as HTMLDivElement
    prevBtn.classList.add('fa-solid', 'fa-circle-chevron-left')
  
    const nextBtn = document.querySelector('.swiper-button-next') as HTMLDivElement
    nextBtn.classList.add('fa-solid', 'fa-circle-chevron-right')
  }

  return (
    <div className='mt-8 px-3 py-3 w-[350px] md:w-[680px] lg:w-[720px]'>
      <div className='flex flex-nowrap justify-between'>
        <ul className='timestamp'>
          <li className='text-2xl mb-[2rem]'><TbCalendarTime /></li>
          <li className='mt-0 mb-4 h-[25px]'>9h</li>
          <li className='mt-4 mb-4 h-[25px]'>15h</li>
          <li className='mt-4 mb-4 h-[25px]'>21h</li>
        </ul>

        <Swiper
          navigation={true} 
          modules={[Navigation]}
          spaceBetween={-30}
          slidesPerView={2}
          initialSlide={firstSlide}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="relative bg-black bg-opacity-20 rounded-tr-xl rounded-br-xl">
          {/* Until we have data store in our variable, we show nothing */}
          {weatherCDF.length === 0 ? 
            ('')
            :(weatherCDF.map((weatherCD, index) => (
              <SwiperSlide key={index} className="text-center items-center flex flex-col flex-wrap">
                <h4 className={`${fadeData.fade} py-4 uppercase w-full`}>{forecastDays[index]}</h4>
                {weatherCD.map((wcd, index) => (
                  <ul key={index} className={`${fadeData.fade} flex items-center justify-center pt-4 pb-4 w-full`}>
                    <li>{wcd.main.temp.toFixed(2)}°c</li>
                    <li className='ml-2 relative w-[25px] h-[25px]'>
                      <Image 
                        src={`/weatherIcons/${wcd.weather[0].icon}@2x.png`} 
                        alt={`${wcd.weather[0].icon}`}
                        layout="fill"
                        className='object-contain'
                      />
                    </li>
                  </ul>
                ))}
                {/* If there is no more forecast data but empty slot */}
                {weatherCDF.length - (index+1) === 0 ? 
                  (<>
                    {noWeatherData.map((nwd, index) => (
                      <ul key={index} className={`${fadeData.fade} flex flex-col items-center justify-center pt-4 pb-4 w-full`}>
                        <li>{nwd}</li>
                      </ul>
                    ))}
                  </>)
                  :
                  ('')
                }
              </SwiperSlide>
            )))
          }
        </Swiper>

      </div>
    </div>
  )
}