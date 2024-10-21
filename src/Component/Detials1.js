import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Modal from "react-modal";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import "../Styles/Filter.css";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);
  const [gallaryIsOpen, setGallaryIsOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const qs = new URLSearchParams(location.search);
  const Idqs = qs.get("resturant");
  const handleNavigate = () => {
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    axios
      .get(`https://foodii-backend.onrender.com/getrestbyid/${Idqs}`)
      .then((res) => setRestaurant(res.data))
      .catch(() => console.log("ERROR"));
    axios
      .get(`https://foodii-backend.onrender.com/getmenu/${restaurant.name}`)
      .then((res) => setMenu(res.data));
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
  const handleTabSelect = (index) => {
    setSelectedTab(index);
  };
  return (
    <>
      <div className="container-fluid">
        {
          <div>
            <img
              className="detialsimg"
              src={restaurant.image}
              alt="Description of your image"
            />
            <div className="detials-restaurant">{restaurant.name}</div>
            <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
              <TabList>
                <Tab>Order</Tab>
                <Tab>MealType</Tab>
              </TabList>
              <TabPanel>
                <div className="detials-restaurant">Order Information</div>
                <div className="detials-list-data">
                  <span>Name :</span> {restaurant.name}
                </div>
                <div className="detials-list-data">
                  <span>locality :</span> {restaurant.locality}
                </div>
                <div className="detials-list-data">
                  <span>Min_price : &#8377; </span>
                  {restaurant.min_price}
                </div>
                <div className="order-buttion-section">
                  <div>
                    <button className="cancel-button" onClick={handleNavigate}>
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button className="order-button" onClick={gallaryOpen}>
                      Confirm
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="detials-restaurant">Payment Information</div>
                <div className="detials-list-data">
                  <span>contact_number : </span> {restaurant.contact_number}
                </div>
                <div className="detials-list-data">
                  <span>city :</span> {restaurant.city}
                </div>
                <div className="order-buttion-section">
                  <div>
                    <button className="cancel-button" onClick={handleNavigate}>
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button className="order-button" onClick={gallaryOpen}>
                      Confirm
                    </button>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        }
      </div>
      <Modal isOpen={gallaryIsOpen} style={customStyles}>
        {menu.map((e) => {
          return (
            <div>
              <div className="detial-title">{e.name.toUpperCase()}</div>
              <hr />
              {e.menu.map((a, index) => (
                <div className="row mb-4" key={index}>
                  <div className="detial-name col-md-6">{a.item}</div>
                  <div class="col-md-4 detials-button-section">
                    <button
                      className="detials-button-add"
                      onClick={() => handleDecrement(a, index)}
                    >
                      -
                    </button>
                    <button className="button-count">
                      {count[index] || 0}
                    </button>
                    <button
                      className="detials-button-add"
                      onClick={() => handleIncrement(a, index)}
                    >
                      +
                    </button>
                  </div>
                  <div
                    className="detial-price col-md-2"
                    style={{ textAlign: "end" }}
                  >
                    &#8377; {a.amount}
                  </div>
                </div>
              ))}
              <hr />
              <div className="detial-subtotal">
                SubTotal: &#8377; {quantity || 0}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="cancel-button-order"
                  onClick={handleNavigate}
                >
                  Cancel
                </button>
                <button
                  className="pay-button"
                  style={{ width: "130px" }}
                  onClick={paymentIsOpen}
                >
                  Pay Online
                </button>
                <button
                  className="pay-button mx-2"
                  style={{ width: "185px" }}
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
