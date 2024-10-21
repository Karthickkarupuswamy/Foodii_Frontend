import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = (props) => {
  const [total, setTotal] = useState(props.amount);
  const navigate = useNavigate();
  const handlePay = (e) => {
    e.preventDefault();
    if (total === "") {
      alert("Please enter the Amount");
    } else {
      let option = {
        key: "rzp_test_kXqvWeEDmZf3GE",
        key_secret: "KUeNBDBBiCcN6vrn4Q9hDUJK",
        amount: total * 100,
        current: "INR",
        name: "ZOMATO",
        descripation: "for testing",
        handler: (response) => {
          alert(response.razorpay_payment_id);
          navigate("/");
        },
        prefill: {
          name: "Karthick",
          email: "karthickmech8005@gmail.com",
          contact: "9629641579",
        },
        note: {
          address: "Razorpay Corprate office",
        },
        theme: {
          color: "powderblue",
        },
      };
      let pay = new window.Razorpay(option);
      pay.open();
    }
  };
  const handleNavigate = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{ height: "auto" }}>
      <div className="pament-title">Verified payment and continuing</div>
      <div
        className="value-amount"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
      >
        {props.amount}
      </div>
      <div>
        <button className="cancel-button-order" onClick={handleNavigate}>
          Cancel
        </button>
        <button className="pay-button" onClick={handlePay}>
          Pay
        </button>
      </div>
    </div>
  );
};
export default Payment;
