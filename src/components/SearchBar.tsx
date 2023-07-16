'use client'
import { SetStateAction, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({searchCountry,setSearchCountry, addCountryToHistory}:any){
  const [searchTerm, setSearchTerm] = useState('');
  const [error,setError] = useState(null);
  const [data,setData] = useState(null) ;
  
  const fetchData = useCallback(async (countryName:string) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
      if(!API_KEY){
        throw({message:"Invalid API KEY"});
      }
      if(countryName ===''){
        return;
      }
      // docs https://openweathermap.org/current#name
      const URL = `http://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&APPID=${API_KEY}`;
      const result = await axios(URL);
      if(result.data?.cod==="404"){
        throw(result.data)
      }
      setData(result.data);
      addCountryToHistory(result.data)
      setSearchTerm('');
      setError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError((err as any)?.response?.data?.message ?? (err as any)?.message ?? 'Oops something went wrong');
    }
  },[addCountryToHistory]);

  const handleSearch= (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
    setError(null);
  };

  // Fetch data whenever searchCountry changes
  useEffect(() => {
    if (searchCountry) {
      fetchData(searchCountry);
      setSearchCountry(null)
    }
  }, [searchCountry,setSearchCountry, fetchData]);

  return (
    <>
      <form onSubmit={(e) => {e.preventDefault(); fetchData(searchTerm);}} className="flex w-full mx-auto">
          <div className="container">
            <div className="flex flex-row items-center justify-left">
              <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full h-14 px-4 text-sm bg-white/20 dark:bg-[#1A1A1A]/50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/10 dark:focus:ring-black/10 mr-3 placeholder-slate-600/75 dark:placeholder-white/50 transition ease-in-out duration-300 "
                  placeholder="Country"
                />
            </div>
          </div>
          <button type="submit" className="h-14 w-14 flex items-center justify-center text-white focus:outline-none focus:ring-4 focus:ring-[#6C40B5]/10 font-medium rounded-2xl px-5 py-2.5 text-center bg-[#6C40B5] hover:bg-[#6C40B5] dark:bg-[#28124D] dark:hover:bg-[#28124D] dark:focus:ring-indigo-900 transition ease-in-out duration-300">
            <FontAwesomeIcon icon={faSearch} size="lg"/>
          </button>
      </form>

      <div className={error ? "bg-rose-600/75 drop-shadow text-white py-1 px-3 text-sm rounded my-2 mx-auto text-left" :"hidden"}>{error}</div>
    </>
  )
}