import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import "./hotel.css";

import "react-datepicker/dist/react-datepicker.css";
const Hotel = () => {
  // const location = useLocation();
  // const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  console.log("Hotel ID:", id);

  // const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  useEffect(() => {
    getHotelData();
  }, []);

  const getHotelData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/hotel/${id}`);
      console.log("single hotel res-->", res.data.message);
      setData(res.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("hotel get error", error);
    }
  };
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // Ensure dates is defined and has the expected structure before using its properties
  const days =
    dates?.[0]?.endDate && dates?.[0]?.startDate
      ? dayDifference(dates[0].endDate, dates[0].startDate)
      : 0;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick =async () => {
    console.log("user -->",user);
    if (user) {
      try {
        const orderData = {
          user:user._id , // Replace with the actual user ID
          serviceType: 'hotel', // Replace with the actual service type (e.g., hotel, photographer, etc.)
          serviceId: id, // Replace with the actual service ID
          startDate:startDate, // Replace with the actual start date
          endDate: endDate, // Replace with the actual end date
          totalPrice: data.price, // Replace with the actual total price
          // Optionally, you can include payment and orderStatus here as well
        };
    
        const response = await axios.post(`${baseUrl}/api/order/create`, orderData);
        console.log('Order created:', response.data);
        // Handle success - do something with the response data if needed
      } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
        // Handle error - log error details or display an error message to the user
      }

    } else {
      navigate("/login");
    }
  };


  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.images[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.city}</span>
            </div>
            {/* <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span> */}
            <span className="hotelPriceHighlight">
              Book a stay over at this property and get a free airport taxi
            </span>
            <div className="flex  gap-4 ">
              {data.images?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}

            </div>
            <div
              className="hotelDetailsPrice mt-6"
              style={{ alignContent: "center", marginLeft: "33%" }}
            >
              {/* <h1>Perfect for a {days}-night stay!</h1> */}
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              {/* <h2>
                <b>${days * data.price * options.room}</b> ({days} nights)
              </h2> */}

              <div className="shadow-xl p-9 ">
                <p className="text-lg text-blue-800">Choose Check in Date:</p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />

                {/* <div className="mt-3">
                  <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="" disabled>
                      Select a Room
                    </option>
                    <option value="option1">Room No: 347872</option>
                    <option value="option2">Room No: 347872</option>
                    <option value="option3">Room No: 3478723</option>
                    <option value="option4">Room No: 3478724</option>
                  </select>
                </div> */}

                <p className="mt-9 text-lg text-blue-800">Choose Check in Date:</p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
                <p className="mt-10 text-md ">Price Per Night: ${data.price}</p>
              </div>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {/* {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />} */}
    </div>
  );
};

export default Hotel;
