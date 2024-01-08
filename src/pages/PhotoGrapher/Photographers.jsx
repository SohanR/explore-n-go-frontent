import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Photographers = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const datass = async () => {
      const res = await axios.get(`${baseUrl}/api/photos`);
      console.log("photos", res);
      setData(res.data);
    };
    datass();
  }, []);

  const handleClick = async (id, price) => {
    console.log("user -->", user);
    if (user) {
      try {
        const orderData = {
          user: user._id, // Replace with the actual user ID
          serviceType: "Photgraphy", // Replace with the actual service type (e.g., hotel, photographer, etc.)
          serviceId: id, // Replace with the actual service ID
          // startDate:startDate, // Replace with the actual start date
          // endDate: endDate, // Replace with the actual end date
          totalPrice: price, // Replace with the actual total price
          // Optionally, you can include payment and orderStatus here as well
        };

        const response = await axios.post(
          `${baseUrl}/api/order/create`,
          orderData
        );
        console.log("Order created:", response.data);
        // Handle success - do something with the response data if needed
      } catch (error) {
        console.error(
          "Error creating order:",
          error.response ? error.response.data : error.message
        );
        // Handle error - log error details or display an error message to the user
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-2 mt-3">
        {console.log("data", data)}

        {data.map((p) => (
          <div className="custom-card " key={p._id}>
            <img
              className="w-[400px] h-[35vh]"
              src="https://plus.unsplash.com/premium_photo-1673349178635-39b654f84401"
              alt="Album"
            />
            <div className="custom-card-body">
              <div className="body-title">
                <div>
                  {" "}
                  <h2 className="custom-card-title">{p.name}</h2>
                  <p className="desc">Camera Model : {p.cameraModel}</p>
                  <p>Price: {p.priceHourly}$ per Hour</p>
                </div>
                <div></div>
              </div>

              <button
                type="submit"
                onClick={() => handleClick(p._id, p.priceHourly)}
                className="btn px-4 bg-blue-400 rounded mt-20"
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Photographers;
