import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState(0);

  const handleRazorPay = async () => {
    const key = await axios.post("http://localhost:8080/api/v1/getKey");
    const response = await axios.post(
      "http://localhost:8080/api/v1/createorder",
      { amount }
    );

    const options = {
      key: key.data.message,
      amount: response.data.message.amount,
      currency: "INR",
      name: "Amresh Store",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: response.data.message.id,
      callback_url: "http://localhost:8080/api/v1/payments",
      prefill: {
        name: "Amresh Mallick",
        email: "testing@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Amresh Store",
      },
      theme: {
        color: "#20b131",
      },
    };
    const razorPaypopup = new window.Razorpay(options);
    razorPaypopup.open();
  };

  return (
    <div>
      <div className="inpFieldParent">
        <label className="labelHeading">
          Enter Amount for Tranasaction :- ₹ {amount}
        </label>{" "}
        <input
          className="inputField"
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="paymentMethod">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4vtyJflqxGxo9kIIqQGCAm7Uf4oU35BW97TKcpRchoQ&s"
            alt="Razorpay"
            width={150}
            style={{ cursor: "pointer" }}
            onClick={handleRazorPay}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
