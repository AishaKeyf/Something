
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

function Weather() {

    let [sunrise, setSunrise] = useState()
    let [sunset, setSunset] = useState()
    const [time, setTime] = useState()

    // IN THE FIVE STEP THIS IS HOW TO USE USEREF 
    const inputRef = useRef('')


    // FOURTH: MAKE A STATE TO PUBLISH AND STORE THE DATA THAT COMING FROM THE API and give a false value in the begining
    const [weatherData, setWeatherData] = useState(null)

    // FIRST: MAKE A FUNCTION TO MANAGE THE 
    const search = async (city) => {

        // IF THE SEARCH INPUT IS EMPTY
        if (city === '') {
            alert('Inter a city name')
            return
        }


        // SECOND: CALL THE URL 
        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`

            // AND: fetch the data 
            const response = await fetch(url)
            const data = await response.json()

            // EIGHT:
            // if te city is wrong or not found
            if (!response.ok) {
                alert('City Not Found')
                return
            }

            console.log('here is data ', data);



            // const sr = data.sys.sunrise
            // const ss = data.sys.sunset
            // const snr = new Date(sr * 1000)  // convert in to millisecond
            // const sns = new Date(ss * 1000)
            // const srs = snr.toLocaleDateString() //format time and date
            // const snst = sns.toLocaleDateString() hi//format time and date


            // After fourth step
            // now,set the data in the setter varriable and make one object to store wat you need from the api data
            setWeatherData(data)


            //format time and date
            const yt = data.sys.sunrise
            const ty = new Date(yt * 1000)
            // const srs = snr.toLocaleDateString()
            const yearTime = new Intl.DateTimeFormat("en-us", {
                dateStyle: 'full',
                // timeStyle: 'short'
            })
            console.log('sunrise here again ', { fomrmated: yearTime.format(ty), sunrise: yt })
            setTime(yearTime.format(ty))


            // SUNRISE TIME
            const sr = data.sys.sunrise
            const snr = new Date(sr * 1000)
            const srs = snr.toLocaleDateString()
            const f = new Intl.DateTimeFormat("en-us", {
                // dateStyle: 'full',
                timeStyle: 'short'
            })
            // console.log('sunrise here again ', { fomrmated: f.format(snr), sunrise: sr })
            setSunrise(f.format(snr))


            // SUNSET TIME
            const ss = data.sys.sunset
            const sns = new Date(ss * 1000)
            // const srs = snr.toLocaleDateString()
            const t = new Intl.DateTimeFormat("en-us", {
                // dateStyle: 'full',
                timeStyle: 'short'
            })
            setSunset(t.format(sns))

        } catch (error) {
            setWeatherData(false)
            console.error('Error in fetching data', error)

        }
    }



    // THIRD: call the function when ever component it gets louded
    useEffect(() => {
        search('Garoowe')

    }, [])
    return (

        <div className=" bg-navy-blue h-screen p-2">

            <div className="">
                <div className="flex items-center justify-center ">

                    {/* FIVE: ADD REFRENCE TO GET INPUT VALUE*/}
                    <input type="text" placeholder="Inter a Location"
                        ref={inputRef}
                        className='rounded p-3 bg-amber-50 w-full ml-2 my-6 md:w-1/2'
                    />


                    {/* SIXTH: PASS THE SEARCH FUNCTION WHEN THE USER CLICK THIS BUTTON*/}
                    <button className='rounded bg-blue-200  hover:bg-blue-300 cursor-pointer w-30 p-3 mx-2 hover:shadow-2xl shadow-md'
                        onClick={() => search(inputRef.current.value)}
                    >
                        Search
                        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                    </button>
                </div>

                {/* SEVEN: IF THE API KEY IS WRONG TELL THEM THAT THE API KEY IS WRONG AND NEED TO CORRECT  */}
                {weatherData ? <>
                    <div className="flex items-center justify-between md:justify-around p-3 md:mx-4 flex-row text-white ">
                        <div className="">
                            <h3 className="text-xl font-bold capitalize py-3 ">{weatherData.name}, {weatherData.sys.country}</h3>
                            <p>{time}</p>

                            <div className=" pt-5">
                                <p className="text-md text-gray-300  md:pb-10">{weatherData.weather[0].description} </p>
                                <h1 className="text-3xl font-bold  ">{weatherData.main.temp.toFixed()} °C</h1>
                            </div>
                        </div>
                        <div className="">
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />

                        </div>
                    </div>



                    <div className="flex justify-around md:justify-center md:mx-4 md:items-center  flex-col md:flex-row md:gap-2 mt-4 ">
                        {/* <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <FontAwesomeIcon icon={faDroplet} className="text-lg font-bold text-blue-200  " />
                            <h1 className="text-lg font-bold px-2 ">{weatherData.uvi}</h1>
                        </div>
                        <p className="px-5 ">UV index</p> */}

                        <div className="flex flex-row justify-between items-center shadow-lg rounded-xs bg-blue-200 hover:bg-blue-300 cursor-pointer  p-5 my-6 md:w-50  lg:w-70">
                            <div className=" flex flex-col items-center">
                                <p className="px-5 ">Feels Like</p>
                                <h1 className="text-lg font-bold px-2 ">{weatherData.main.feels_like.toFixed()} °C</h1>
                            </div>
                            <FontAwesomeIcon icon={faTemperatureHigh} className="text-lg font-bold text-navy-blue  " />
                        </div>
                        <div className="flex flex-row justify-between shadow rounded-xs bg-blue-200 hover:bg-blue-300 cursor-pointer  p-5 my-6 md:w-50  lg:w-80 ">
                            <div className="flex flex-col items-center">
                                <h1 className="text-lg font-bold px-2 ">{weatherData.main.humidity}%</h1>
                                <p className="px-5 ">Humidity</p>
                            </div>
                            <FontAwesomeIcon icon={faDroplet} className="text-lg font-bold text-navy-blue  " />
                        </div>
                        <div className="flex flex-row justify-between shadow rounded-xs bg-blue-200 hover:bg-blue-300 cursor-pointer  p-5 my-6 md:w-50  lg:w-80 ">
                            <div className="flex flex-col items-center">
                                <p className="px-6 ">Wind Speed</p>
                                <h1 className="text-lg font-bold px-2   ">{weatherData.wind.speed}Km/h</h1>
                            </div>
                            <FontAwesomeIcon icon={faWind} className="text-lg font-bold text-navy-blue  " />
                        </div>

                    </div>

                    <div className="flex flex-row justify-around md:justify-center md:my-10 gap-2 items-center ">
                        <div className="flex flex-row justify-between shadow rounded-xs bg-blue-200 hover:bg-blue-300 cursor-pointer  p-5 gap-5 md:w-80 ">
                            <p className='px-5'>Sunrise:</p>
                            <h1 className='font-semibold '>{sunrise}</h1>
                        </div>
                        <div className="flex flex-row justify-between shadow rounded-xs bg-blue-200 hover:bg-blue-300 cursor-pointer  p-5 gap-5 md:w-80 ">
                            <p className='px-5'>Sunset:</p>
                            <h1 className='font-semibold'>{sunset}</h1>
                        </div>

                    </div>
                </> : < >
                </>}

            </div>
        </div >
    )
}
export default Weather
