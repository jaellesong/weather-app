'use client'
import { useState } from "react";
import SearchBar from '@/components/SearchBar'
import WeatherCurrent from '@/components/WeatherCurrent'
import WeatherHistory from '@/components/WeatherHistory'

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  dt: number;
  weather : [];
  clouds : {
    all : number;
  }
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([]);
  const [searchCountry, setSearchCountry] = useState<string>('');

  const handleDeleteCountry = (weather:WeatherData) => {
    setWeatherHistory(weatherHistory.filter(el=> el !== weather));
  }

  const getCountryWeather = (weatherName:string) => {
    setSearchCountry(weatherName);
  }

  const addCountryToHistory = (weather:WeatherData) => {
    setWeatherHistory(current => [...current, weather]);
    setWeatherData(weather)
  }
  const mainTitle = ()=>{
    if(!weatherData && weatherHistory.length==0){
      return(
        <div className="text-white text-2xl md:text-3xl mb-8 text-[#6C40B5] dark:text-white text-center font-bold">CloudCast: Your Weather Companion</div>
      )
    }
    return;
  }

  const mainWeatherSection =  ()=>{
    if(weatherData && weatherHistory.length>0){
      return( <div className="relative flex flex-col w-full mx-auto bg-white/20 dark:bg-[#1A1A1A]/30 rounded-3xl border border-white/25 dark:border-none p-6 md:p-8 md:p-10 mt-32 sm:mt-36 md:mt-42">
        {weatherData && <WeatherCurrent data={weatherData}/>}
        {weatherHistory && <WeatherHistory weatherHistory={weatherHistory} onDeleteCountry={handleDeleteCountry} getCountryWeather={getCountryWeather}/>}
      </div>)
      }
    return;
  }
  
  return (
    <main className={`container max-w-screen-md mx-auto flex ${!weatherData && weatherHistory.length ==0 ?'justify-center':''} min-h-screen flex-col items-center p-5`}>
      {mainTitle()}
      <SearchBar searchCountry={searchCountry} setSearchCountry={setSearchCountry} addCountryToHistory={addCountryToHistory}/>
    
      {mainWeatherSection()}
    </main>
  )
}