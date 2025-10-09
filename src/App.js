import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Components/Card";
import "./App.css";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [cityName, setCityName] = useState("Pune"); // default city

  // const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=f82b355f317b4eef930160425250910&q=${cityName}&days=5&aqi=no&alerts=no`
          // `https://api.weatherapi.com/v1/current.json?key=f82b355f317b4eef930160425250910&q=${cityName}&aqi=no`
        );
        setWeatherInfo(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cityName]);

  // //-----------------  5 days data     -------------------
  // useEffect(() => {
  //   const secondData = async () => {
  //     try {
  //       const response =
  //         await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=f82b355f317b4eef930160425250910&q=Pune&days=5&aqi=no&alerts=no`);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   secondData();
  // }, []);

  return (
    <div
      className="App"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {weatherInfo ? (
        <Card
          weatherInfo={weatherInfo}
          onSearch={(city) => setCityName(city)}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
