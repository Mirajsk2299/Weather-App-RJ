import React, { useState } from "react";
import "../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faShare,
  faBookmark,
  faHeart,
  faSun,
  faCloudSun,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  // faCloudMoonRain,
} from "@fortawesome/free-solid-svg-icons";

const Card = ({ weatherInfo, onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Weather App 🌦️",
      text: "Check out this weather forecast!",
      url: window.location.href, 
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Website shared successfully!");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Share not supported — Link copied to clipboard ✅");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const { location, current } = weatherInfo;

  const getTempTitleAndIcon = (temp) => {
    const t = temp ?? 20;

    if (t >= 30) {
      return {
        title: "Sunny",
        icon: (
          <FontAwesomeIcon
            icon={faSun}
            size="3x"
            style={{ color: "#FFD43B" }}
          />
        ),
      };
    } else if (t >= 25) {
      return {
        title: "Warm",
        icon: (
          <FontAwesomeIcon
            icon={faCloudSun}
            size="3x"
            style={{ color: "#FFD43B" }}
          />
        ),
      };
    } else if (t >= 20) {
      return {
        title: "Partly Cloudy",
        icon: (
          <FontAwesomeIcon
            icon={faCloudSun}
            size="3x"
            style={{ color: "#B0B0B0" }}
          />
        ),
      };
    } else if (t >= 15) {
      return {
        title: "Cool",
        icon: (
          <FontAwesomeIcon
            icon={faCloud}
            size="3x"
            style={{ color: "#808080" }}
          />
        ),
      };
    } else if (t >= 10) {
      return {
        title: "Rainy",
        icon: (
          <FontAwesomeIcon
            icon={faCloudRain}
            size="3x"
            style={{ color: "#4A90E2" }}
          />
        ),
      };
    } else if (t >= 5) {
      return {
        title: "Cold",
        icon: (
          <FontAwesomeIcon
            icon={faCloudShowersHeavy}
            size="3x"
            style={{ color: "#2E86C1" }}
          />
        ),
      };
    } else if (t >= 0) {
      return {
        title: "Snow",
        icon: (
          <FontAwesomeIcon
            icon={faSnowflake}
            size="3x"
            style={{ color: "#00BFFF" }}
          />
        ),
      };
    } else {
      return {
        title: "Freezing",
        icon: (
          <FontAwesomeIcon
            icon={faBolt}
            size="3x"
            style={{ color: "#FFD700" }}
          />
        ),
      };
    }
  };

  const { title, icon } = getTempTitleAndIcon(current.temp_c);

  return (
    <div className="card-box">
      <h1 className="head-tag"> Weather App</h1>

      <div className="input-cand">
        <form className="inp-frm" onSubmit={handleSubmit}>
          <input
            className="inp-bar"
            type="text"
            placeholder="🔍 Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />{" "}
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="info">
        <p>
          {new Date()
            .toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .replace(",", "")}
        </p>

        <h4>{location.name}</h4>
        <h5>{location.country}</h5>

        <div style={{ fontSize: "50px", margin: "3px 0" }}>{icon}</div>

        <h4>{current.temp_c}°C</h4>
        <h2>{title}</h2>
      </div>

      <div className="box-data">
        <div className="quality">
          <h3>Wind Speed</h3>
          <h5>{current.wind_kph} km/hr</h5>
        </div>

        <div className="quality">
          <h3>Visibility</h3>
          <h5>{current.vis_km} km</h5>
        </div>
      </div>

     

      <div className="daily-data">
        {weatherInfo.forecast.forecastday.slice(1).map((day, index) => {
          const date = new Date(day.date);

          const weekday = date.toLocaleString("en-US", { weekday: "short" });

          const dayMonth = `${date.getDate()}/${date.getMonth() + 1}`;

          const iconUrl = "https:" + day.day.condition.icon; 
          const temp = Math.round(day.day.avgtemp_c);

          return (
            <div className="days" key={index}>
              <p>
                {weekday} {dayMonth}
              </p>{" "}
              <img
                src={iconUrl}
                alt={day.day.condition.text}
                style={{ width: "30px", marginBottom: "5px" }}
              />
              <h5>{temp}°C</h5>
            </div>
          );
        })}
      </div>

      <div className="buttons">
        <button className="sav-btn" onClick={handleShare}>
          Share <FontAwesomeIcon icon={faShare} style={{ color: "#73aa64" }} />
        </button>

        <button className="sav-btn">
          Save{" "}
          <FontAwesomeIcon icon={faBookmark} style={{ color: "#94b6f0" }} />
        </button>
        <button className="sav-btn">
          Saved Cities{" "}
          <FontAwesomeIcon icon={faHeart} style={{ color: "#eea5ac" }} />
        </button>
      </div>
    </div>
  );
};

export default Card;
