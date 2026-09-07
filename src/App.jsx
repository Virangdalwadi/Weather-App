import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(33);
  const [location, setLocation] = useState("Ahmedabad");
  const [wind, setWind] = useState(10);

  const [tableData, setTableData] = useState(() => {
    const saved = localStorage.getItem("WeatherData");
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = "476bd1afe404be87e8e806b4337cb51a";

  const saveTemp = () => {
    if (location == "" || temp == "" || wind == "") {
      return alert("Enter City Name");
    }

    const newRecord = {
      id: Date.now(),
      location: location,
      temp: temp,
      wind: wind,
    };

    const updatedData = [...tableData, newRecord];

    setTableData(updatedData);
    localStorage.setItem("WeatherData", JSON.stringify(updatedData));

    alert("Data Saved Successfully!");
  };

  const removeTemp = (idToRemove) => {
    const delMes = confirm("Are you sure you want to Delete this Record");
    if (!delMes) {
      return;
    }

    console.log("id:", idToRemove);

    const updatedData = tableData.filter((item) => item.id !== idToRemove);

    setTableData(updatedData);

    localStorage.setItem("WeatherData", JSON.stringify(updatedData));
  };

  const fetchweather = () => {
    if (!city) {
      return alert("Enter City Name");
    }
    const url = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;

    axios.get(url).then((response) => {
      if (response.data.current) {
        setTemp(response.data.current.temperature);
        setLocation(response.data.location.name);
        setWind(response.data.current.wind_speed);
      } else {
        alert("City not found or API error");
      }
    });
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600 flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 py-6 sm:py-8 md:py-10">
        {/* Weather Input Card */}
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-5 md:mb-6">
              ⛅ Weather App
            </h1>

            <input
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <div className="flex gap-2 mt-3 sm:mt-4">
              <button
                onClick={fetchweather}
                className="flex-1 bg-blue-600 text-white py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition duration-200"
              >
                Get Weather
              </button>
              <button
                onClick={saveTemp}
                className="flex-1 bg-blue-600 text-white py-2 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition duration-200"
              >
                Save
              </button>
            </div>

            <div className="mt-6 sm:mt-8 border-t pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2 mb-3 sm:mb-4">
                <p className="text-base sm:text-lg text-gray-700 font-medium">
                  Current Weather
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {temp}&deg;C
                </h2>
              </div>
              <p className="text-center font-bold text-gray-600 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
                📍 {location}
              </p>

              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base text-gray-700 font-medium">💨 Wind Speed</span>
                <span className="text-lg sm:text-xl font-bold text-blue-700">
                  {wind} km/h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Locations Table Card */}
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
              Saved Locations
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse text-xs sm:text-sm md:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-2 px-1 sm:px-2 text-center text-gray-600 font-semibold">
                      Location
                    </th>
                    <th className="pb-2 px-1 sm:px-2 text-center text-gray-600 font-semibold">
                      Temp
                    </th>
                    <th className="pb-2 px-1 sm:px-2 text-center text-gray-600 font-semibold">
                      Wind
                    </th>
                    <th className="pb-2 px-1 sm:px-2 text-center text-gray-600 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 last:border-none"
                      >
                        <td className="py-2 sm:py-3 px-1 sm:px-2 text-center text-gray-700 font-medium truncate">
                          {item.location}
                        </td>
                        <td className="py-2 sm:py-3 px-1 sm:px-2 text-center text-blue-600 font-bold">
                          {item.temp}°C
                        </td>
                        <td className="py-2 sm:py-3 px-1 sm:px-2 text-center text-gray-700 font-medium">
                          {item.wind}
                        </td>
                        <td className="py-2 sm:py-3 px-1 sm:px-2 text-center text-gray-700 font-medium">
                          <button
                            onClick={() => removeTemp(item.id)}
                            className="bg-red-600 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition duration-200 whitespace-nowrap"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-3 sm:py-4 px-2 text-center text-gray-400 italic text-xs sm:text-sm"
                      >
                        No saved data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default App;
