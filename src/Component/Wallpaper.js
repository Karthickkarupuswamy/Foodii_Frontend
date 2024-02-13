import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wallpaper = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState([]);
  const [rest, setRest] = useState([]);
  const [locationid, setLocationId] = useState([]);
  const [inputtext, setInputText] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const fetchLocation = () => {
    axios
      .get("https://foodii-backend.onrender.com/getallloc")
      .then((res) => setLocation(res.data))
      .catch((err) => console.log(err));
  };
  const fetchRest = () => {
    axios
      .get(`https://foodii-backend.onrender.com/getAllRestaruents`)
      .then((res) => setRest(res.data));
  };
  useEffect(() => {
    sessionStorage.clear();
    fetchLocation();
    fetchRest();
  }, []);

  const handleLocationChange = (e) => {
    let locationId = e.target.value;
    sessionStorage.setItem("LocationId", locationId);

    axios
      .get(`https://foodii-backend.onrender.com/getall/${Number(locationId)}`)
      .then((res) => {
        setLocationId(res.data);
        console.log(locationid);
      });
  };

  const handleSearch = (e) => {
    let inputText = e.target.value;
    const suggestion = rest.filter((e) =>
      e.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setInputText(inputText);
    setSuggestion(suggestion);
  };
  const selectingRest = (restObj) => {
    navigate(`/detail?resturant=${restObj._id}`);
    window.location.reload();
  };
  const showSuggestion = () => {
    if (suggestion.length === 0 && inputtext === undefined) {
      return null;
    }
    if (suggestion.length > 0 && inputtext === "") {
      return null;
    }
    if (suggestion.length === 0 && inputtext) {
      return (
        <ul>
          <li className="text-danger searchresult">No Serach Result found</li>
        </ul>
      );
    }
    return (
      <ul>
        {suggestion.map((e, i) => (
          <li
            className="searchresult"
            key={i}
            onClick={() => selectingRest(e)}
          >{`${e.name}- ${e.locality},${e.city}  `}</li>
        ))}
      </ul>
    );
  };
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <img
        src="./Assets/bimg.jpg"
        width="100%"
        height="450px"
        alt="Background"
      />
      <div className="content">
        <div className="logo" onClick={handleClick}>
          K:)
        </div>
        <h2 className="h2S text-light">
          Find the best restaurants, Cafes, and Bars
        </h2>
        <div>
          <span>
            <select onChange={handleLocationChange}>
              <option selected disabled>
                --Select the City--
              </option>
              {location.map((loc, index) => {
                return (
                  <option
                    key={index}
                    id={loc.city}
                    value={`${loc.location_id}`}
                  >
                    {" "}
                    {`${loc.name}, ${loc.city}`}
                  </option>
                );
              })}
            </select>
          </span>
          <span className="Searchbox">
            &nbsp; &nbsp; &nbsp;
            <input
              type="text"
              placeholder="Search for restaurant"
              onChange={handleSearch}
            />
            {showSuggestion()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Wallpaper;
