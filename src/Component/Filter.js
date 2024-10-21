import React, { useEffect, useState } from "react";
import "../Styles/Filter.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Filter = () => {
  const navgivate = useNavigate();
  const location = useLocation();
  const [locationData, setLocationData] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 2;
  const [sort, setSort] = useState(1);
  const [cusineid, setCuisineid] = useState([]);
  const [lcost, setLcost] = useState(undefined);
  const [hcost, setHcost] = useState(undefined);
  const qs = new URLSearchParams(location.search);
  const mealtype_id = qs.get("meal_type");
  const location_id = Number(sessionStorage.getItem("locationID"));
  useEffect(() => {
    axios
      .get("https://foodii-backend.onrender.com/getallloc")
      .then((res) => setLocationData(res.data))
      .catch((err) => console.log(err));

    const filterObj = {
      mealtype_id: Number(mealtype_id),
      location_id: location_id,
      cuisine_id: cusineid,
      sort: sort,
      lcost: lcost,
      hcost: hcost,
    };
    axios
      .post("https://foodii-backend.onrender.com/api/query", filterObj)
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.log(err));
  }, [location, sort, cusineid, lcost, hcost, location_id, mealtype_id]);

  const searchHandle = (e) => {
    let locationids = Number(e.target.value);
    const filterObj = {
      mealtype_id: Number(mealtype_id),
      location_id: locationids,
      sort: sort,
      lcost: lcost,
      hcost: hcost,
    };
    axios
      .post("https://foodii-backend.onrender.com/api/query", filterObj)
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.log(err));
  };

  const filters = () => {
    const filterObj = {
      mealtype_id: Number(mealtype_id),
      location_id: location_id,
      cuisine_id: cusineid,
      sort: sort,
      lcost: lcost,
      hcost: hcost,
    };
    axios
      .post("https://foodii-backend.onrender.com/api/query", filterObj)
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.log(err));
  };

  const handleCuisine = (id) => {
    const index = cusineid.indexOf(id);
    if (index === -1) {
      cusineid.push(id);
      setCuisineid(cusineid);
    } else {
      cusineid.splice(index, 1);
      setCuisineid(cusineid);
    }
    setTimeout(() => {
      filters();
    }, 0);
  };

  const searchSort = (e) => {
    const sort = e.target.value;
    setSort(sort);
    setTimeout(() => {
      filters();
    }, 0);
  };

  const handleCost = (lcost, hcost) => {
    setLcost(lcost);
    setHcost(hcost);
    setTimeout(() => {
      filters();
    }, 0);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const length = Math.ceil(restaurants.length / restaurantsPerPage);
  const currentRestaurants =
    restaurants.length > 0
      ? restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant)
      : 0;
  const handleDetail = (e) => {
    navgivate(`/detail?resturant=${e._id}`);
  };

  return (
    <div>
      <div className="container">
        <div className="head">
          <h1>Breakfast Place</h1>
        </div>
        <div className="col-xs-11 box1">
          <h2>Filters</h2>
          <div className="filter-title-list">Select Location</div>
          <select className="location" onChange={searchHandle}>
            <option selected disabled>
              --Select City--
            </option>
            {locationData.map((loc, index) => {
              return (
                <option key={index} id={loc.city} value={`${loc.location_id}`}>
                  {`${loc.name}, ${loc.city}`}
                </option>
              );
            })}
          </select>
          <div className="filter-title-list">Cuisine</div>
          <div>
            <input type="checkbox" onChange={() => handleCuisine(2)} /> South
            Indian
          </div>
          <div>
            <input type="checkbox" onChange={() => handleCuisine(1)} /> North
            Indian
          </div>
          <div>
            <input type="checkbox" onChange={() => handleCuisine(3)} /> Chinese
          </div>
          <div>
            <input type="checkbox" onChange={() => handleCuisine(4)} /> Fast
            Food
          </div>
          <div>
            <input type="checkbox" onChange={() => handleCuisine(5)} /> Street
            Food
          </div>
          <div className="filter-title-list">Cost For Two</div>
          <div>
            <input
              type="radio"
              name="cost"
              onChange={() => handleCost(0, 500)}
              style={{ marginRight: "4px" }}
            />
            Less than &#8377;500😍
          </div>
          <div>
            <input
              type="radio"
              name="cost"
              onChange={() => handleCost(500, 1000)}
              style={{ marginRight: "4px" }}
            />
            &#8377;500 to &#8377;1000
          </div>
          <div>
            <input
              type="radio"
              name="cost"
              onChange={() => handleCost(1000, 1500)}
              style={{ marginRight: "4px" }}
            />
            &#8377;1000 to &#8377;1500
          </div>
          <div>
            <input
              type="radio"
              name="cost"
              onChange={() => handleCost(1500, 2000)}
              style={{ marginRight: "4px" }}
            />
            &#8377;1500 to &#8377;2000
          </div>
          <div>
            <input
              type="radio"
              name="cost"
              onChange={() => handleCost(2000, 50000)}
              style={{ marginRight: "4px" }}
            />
            &#8377;2000+
          </div>
          <div className="filter-title-list">Sort By</div>
          <div>
            <input
              type="radio"
              name="sort"
              value={1}
              onClick={searchSort}
              style={{ marginRight: "4px" }}
            />
            Price low to High😁
          </div>
          <div>
            <input
              type="radio"
              name="sort"
              value={-1}
              onClick={searchSort}
              style={{ marginRight: "4px" }}
            />
            High to Low🙄
          </div>
        </div>
        <div className="filter-box-container">
          {currentRestaurants.length > 0 ? (
            currentRestaurants.map((e) => {
              return (
                <div className="box2" onClick={() => handleDetail(e)}>
                  <img src="./Assets/img2.jpg" alt="image" className="img1" />
                  <div className="filter-hotel">{e.name}</div>
                  <div className="filter-location">{e.locality}</div>
                  <div className="filter-city">{e.city}</div>
                  <hr />
                  <div className="d-flex mx-1">
                    <div className="food-list">Cuisine</div>
                    <div className="food-price-list">
                      {e.cuisine.map((a) => a.name)}
                    </div>
                  </div>
                  <div className="d-flex  mx-1">
                    <div className="food-list">Cost of</div>
                    <div className="food-price-list">{e.min_price}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 style={{ color: "red" }}>No Result Found...</h1>
          )}
        </div>
        {restaurants.length > 0 ? (
          <div className="btn-group box4">
            {Array.from({ length }).map((_, index) => (
              <p
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                } btn border-primary btn-light`}
                onClick={() => handlePageChange(index + 1)}
              >
                <span className="page-link">{index + 1}</span>
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Filter;
