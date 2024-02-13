import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const QuickSearchItem = () => {
  const [meals, setMeals] = useState([]);

  const navigate = useNavigate();

  const fetchMealsType = () => {
    axios
      .get("https://foodii-backend.onrender.com/getallmeal")
      .then((res) => setMeals(res.data))
      .catch((err) => console.log(err));
  };
  console.log(meals);
  useEffect(() => {
    fetchMealsType();
  }, []);

  const handleNavagateQs = (mealtypeId) => {
    const locationId = sessionStorage.getItem("LocationId");
    if (locationId) {
      navigate(`/filter?meal_type=${mealtypeId}&locationid=${locationId}`);
    } else {
      navigate(`/filter?meal_type=${mealtypeId}`);
    }

    window.location.reload();
  };
  return (
    <>
      {meals.map((item) => {
        return (
          <div data-aos="fade-up"
          data-aos-duration="1000"
            className="col-xs-12 col-md-5 col-lg-3 shadow-lg p-2 mb-5  rounded"
            onClick={() => handleNavagateQs(item.meal_type)}
          >
            <img src={item.image} alt="breakfast" className="boximage" />
            <span className="h4">{item.name}</span>
            <br />
            <br />
            <p>{item.content}</p>
            <p>{item.meal_type}</p>
          </div>
        );
      })}
    </>
  );
};

export default QuickSearchItem;
