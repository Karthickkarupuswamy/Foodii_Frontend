import React, { useState } from "react";

const Payment = (props) => {
  const [total, setTotal] = useState(props.amount);

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

  return (
    <div>
      <p className="h1 text-center" style={{ color: '#2B7A0B' }}>Verified payment and continuing</p>
      <h1 value={total} onChange={(e) => setTotal(e.target.value)}>
        {props.amount}
      </h1>
      <br /> <br />
      <button onClick={handlePay}>Pay</button>
    </div>
  );
};
export default Payment;
