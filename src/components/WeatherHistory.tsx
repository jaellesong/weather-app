import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

export default function WeatherHistory({weatherHistory,onDeleteCountry,getCountryWeather}:any){
  const weatherHistoryItem = ()=>{
    if(!weatherHistory){
      return;
    }
    return weatherHistory.toReversed().map(( data:any, index:any )=>{
      return (
      <div key={index} className="row flex flex-row justify-between items-center bg-white/40 dark:bg-[#1A1A1A]/50 rounded-2xl py-4 px-3 md:px-5 md:px-5 mb-6">
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center text-left">
          <div className="text-sm md:text-base">{data.name}, {data.sys.country}</div>
          <div className="text-xs md:text-base dark:text-white/50 mt-1 md:mt-0">{moment.unix(data.dt).format('DD-MM-YYYY hh:mma')}</div>
        </div>
        <div className="flex flex-row">
          <button type="button" onClick={()=>{getCountryWeather(`${data.name}, ${data.sys.country}`);onDeleteCountry(data)}} className="w-10 h-10 flex justify-center items-center ml-3 rounded-full bg-white text-slate-500 drop-shadow-lg dark:bg-transparent dark:border-white/50 dark:border dark:text-white/50 dark:hover:text-black dark:hover:bg-white dark:drop-shadow-none hover:drop-shadow-none focus:ring-2 transition ease-in-out duration-300 ">
            <FontAwesomeIcon icon={faSearch}/>
          </button>
          <button type="button" onClick={()=>onDeleteCountry(data)}  className="w-10 h-10 flex justify-center items-center ml-3 rounded-full bg-white text-slate-500 drop-shadow-lg dark:bg-transparent dark:border-white/50 dark:border dark:text-white/50 dark:hover:text-black dark:hover:bg-white dark:drop-shadow-none hover:drop-shadow-none focus:ring-2 transition ease-in-out duration-300 ">
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </div>
      </div>);
    });
  }
  return (
    <div className="flex flex-col w-full mx-auto container bg-white/20 dark:bg-[#1A1A1A]/30 rounded-3xl px-5 mt-5">
    <div className="w-full my-6 text-sm md:text-lg">Search History</div>
    <div className="container">
      {weatherHistoryItem()}
    </div>
  </div>
  )
}