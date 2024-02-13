import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Modal from "react-modal";

import Payment from "./Payment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    border: "solid 1px #A9A9A9",
    borderRadius: "35px 35px",
    backgroundColor: "#F9F9F9",
    boxShadow: "10px 10px 5px #EFECEC",
  },
};

const Detials1 = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [restaurentId, setRestaurentId] = useState("");
  const location = useLocation();
  const [restaurant, setRestaurant] = useState([]);

  const [gallaryIsOpen, setGallaryIsOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const qs = new URLSearchParams(location.search);
  const Idqs = qs.get("resturant");
  console.log("Idqs", Idqs);

  useEffect(() => {
    // To check the id in insect
    axios
      .get(`https://foodii-backend.onrender.com/getrestbyid/${Idqs}`)
      .then((res) => setRestaurant(res.data))
      .catch(() => console.log("ERROR"));
    console.log(restaurant);
    axios
      .get(`https://foodii-backend.onrender.com/getmenu/${restaurant.name}`)
      .then((res) => setMenu(res.data));
    console.log(menu);
  }, [restaurant.name]);

  const gallaryOpen = () => {
    setGallaryIsOpen(true);
    axios
      .get(`https://foodii-backend.onrender.com/getmenu/${restaurant.name}`)
      .then((res) => setMenu(res.data));
  };
  const handleDecrement = (selectItem, index) => {
    if (selectItem && quantity > 0 && count[index] > 0) {
      setCount((pre) => {
        const newCount = { ...pre, [index]: pre[index] - 1 };
        setQuantity((pre) => pre - selectItem.amount);
        return newCount;
      });
    }
  };
  const handleIncrement = (selectItem, index) => {
    if (selectItem) {
      setCount((pre) => {
        const newCount = { ...pre, [index]: (pre[index] || 0) + 1 };
        setQuantity((pre) => parseFloat(pre + selectItem.amount));
        return newCount;
      });
    }
  };
  const paymentIsOpen = () => {
    setGallaryIsOpen(false);
    setPaymentModal(true);
  };
  const cashOnDelivery = () => {
    setGallaryIsOpen(false);
    alert("Order Accepted.. wait for few minutes...");
  };
  // console.log('filterRest',filterRest); // to check the filter  restaurant work or not
  const handleTabSelect = (index) => {
    setSelectedTab(index);
  };
  return (
    <>
      <div>
        {
          <div>
            <img
              className="detialsimg"
              src={restaurant.image}
              alt="Description of your image"
            />
            <h1>{restaurant.name}</h1>
            <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
              <TabList>
                <Tab>Order</Tab>
                <Tab>MealType</Tab>
              </TabList>
              <TabPanel>
                <h2>Order Information</h2>
                <h3>Name : {restaurant.name}</h3>
                <h3>locality : {restaurant.locality}</h3>
                <h3>min_price : ${restaurant.min_price}</h3>
                <button className="btn btn-danger" onClick={gallaryOpen}>
                  Ordernow
                </button>
                {/* Display order details here */}
              </TabPanel>
              <TabPanel>
                <h2>Payment Information</h2>
                <h3>contact_number : {restaurant.contact_number}</h3>
                <h3>city : {restaurant.city}</h3>
                <button className="btn btn-danger" onClick={gallaryOpen}>
                  Ordernow
                </button>
                {/* Display payment details here */}
              </TabPanel>
            </Tabs>
          </div>
        }
      </div>
      <Modal isOpen={gallaryIsOpen} style={customStyles}>
        {menu.map((e) => {
          return (
            <div>
              <h1 className="fw-bold">{e.name.toUpperCase()}</h1>
              <hr />
              {e.menu.map((a, index) => (
                <div>
                  <span
                    className="d-flex justify-content-between p-2"
                    key={index}
                  >
                    <p className="px-4 fst-italic">
                      <h3 className="fw-bold">{a.item}</h3>
                      {a.desc}
                    </p>
                    <div
                      className="d-flex justify-content-evenly px-4"
                      style={{ width: "180px", border: "none" }}
                    >
                      <button
                        className="btn btn-outline-warning fs-6 fw-bold"
                        onClick={() => handleDecrement(a, index)}
                      >
                        -
                      </button>
                      <button className="fw-bold fs-6 text-center btn btn-outline-success">
                        {count[index] || 0}
                      </button>
                      <button
                        className="btn btn-outline-warning fs-6 fw-bold"
                        onClick={() => handleIncrement(a, index)}
                      >
                        +
                      </button>
                    </div>
                    <h4 className="py-3" style={{ color: "rgb(255, 69, 0)" }}>
                      &#8377; {a.amount}
                    </h4>
                  </span>
                </div>
              ))}
              <hr />
              <h1 className="px-3 py-1">SubTotal: &#8377; {quantity || 0}</h1>
              <div className="d-flex justify-content-end ">
                <button
                  className="btn btn-outline-success fs-5 fw-bold"
                  onClick={paymentIsOpen}
                >
                  Pay Online
                </button>
                <button
                  className="btn btn-outline-success fs-5 fw-bold mx-2"
                  onClick={cashOnDelivery}
                >
                  Cash On Delivery
                </button>
              </div>
            </div>
          );
        })}
      </Modal>

      <Modal isOpen={paymentModal} style={customStyles}>
        <Payment amount={quantity} />
      </Modal>
    </>
  );
};

export default Detials1;
