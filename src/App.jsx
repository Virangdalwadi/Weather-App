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
      <div className="gap-3 min-h-screen bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              ⛅ Weather App
            </h1>

            <input
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <div className="flex gap-2">
              <button
                onClick={fetchweather}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition duration-200"
              >
                Get Weather
              </button>
              <button
                onClick={saveTemp}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition duration-200"
              >
                Save
              </button>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg text-gray-700 font-medium">
                  Current Weather
                </p>
                <h2 className="text-4xl font-bold text-blue-600">
                  {temp}&deg;C
                </h2>
              </div>
              <p className="text-center font-bold text-gray-600 text-xl mb-4">
                📍 {location}
              </p>

              <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700 font-medium">💨 Wind Speed</span>
                <span className="text-xl font-bold text-blue-700">
                  {wind} km/h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Updated Table Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Saved Locations
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-2 text-center text-gray-600 font-semibold">
                  Location
                </th>
                <th className="pb-2 text-center text-gray-600 font-semibold">
                  Temp
                </th>
                <th className="pb-2 text-center text-gray-600 font-semibold">
                  Wind
                </th>
                <th className="pb-2 text-center text-gray-600 font-semibold">
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
                    <td className="py-3 text-center text-gray-700 font-medium">
                      {item.location}
                    </td>
                    <td className="py-3 text-center text-blue-600 font-bold">
                      {item.temp}°C
                    </td>
                    <td className="py-3 text-center text-gray-700 font-medium">
                      {item.wind} km/h
                    </td>
                    <td className="py-3 text-center text-gray-700 font-medium">
                      <button
                        onClick={() => removeTemp(item.id)}
                        className="w-2/4 bg-red-600 text-white py-1 rounded-lg font-semibold hover:bg-red-700 active:scale-95 transition duration-200"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 text-center text-gray-400 italic"
                  >
                    No saved data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};

export default App;
