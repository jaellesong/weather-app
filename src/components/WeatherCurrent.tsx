import Image from 'next/image'
import moment from 'moment'

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

export default function WeatherCurrent({data}:WeatherData|any){
  const weatherResults = ()=>{
    if(data){
      return (
        <><Image
          src={data.clouds.all > 50 ? '/cloud.png':'/sun.png'}
          alt=""
          className="w-6/12 md:w-auto translate-y-[-50%] absolute top-50 md:right-[1rem] right-[0.25rem] origin-center"
          width={250}
          height={250} /><div className="w-full z-10">
            <p className="text-slate dark:text-white text-sm md:text-base ">Today&apos;s Weather</p>
            <p className="text-7xl md:text-9xl font-bold text-[#6C40B5] dark:text-white my-1">{parseInt(data.main.temp)}&deg;</p>
            <p className="text-sm md:text-base  text-slate dark:text-white my-1">
              H: <span>{parseInt(data.main.temp_max)}&deg;</span> L: <span>{parseInt(data.main.temp_min)}&deg;</span>
            </p>
            <div className="my-1 text-sm md:text-base text-gray-600 dark:text-white w-full flex flex-row justify-between">
              <div className="font-bold w-auto text-sm md:text-base  flex-shrink-0 md:flex-shrink-1 md:w-auto pr-0 md:pr-20">{data.name}, {data.sys.country}</div>
              <div className="w-full text-sm md:text-base mt-[-50%] md:mt-0 flex flex-col-reverse md:flex-row justify-start  md:justify-between text-right md:text-center">
                <div className="mt-1 md:mt-0">{moment.unix(data.dt).format('DD-MM-YYYY hh:mma')}</div>
                <div className="mt-1 md:mt-0">Humidity: <span>{data.main.humidity}%</span></div>
                <div className="mt-1 md:mt-0">{data.weather[0].main}</div>
              </div>
            </div>
          </div></>
      )
    }
    return (<></>);
  }
  return weatherResults();
}