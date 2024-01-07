import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Reserve from "../../components/reserve/Reserve";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import "./hotel.css";

const Hotel = () => {
  // const location = useLocation();
  // const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
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

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
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
              Book a stay over ${data.price} at this property and get a free
              airport taxi
            </span>
            <div className="hotelImages">
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
                    <div className="hotelDetailsPrice" style={{alignContent: 'center',marginLeft: '33%'}}>
                    <h1>Perfect for a {days}-night stay!</h1>
                    <span>
                      Located in the real heart of Krakow, this property has an
                      excellent location score of 9.8!
                    </span>
                    <h2>
                      <b>${days * data.price * options.room}</b> ({days} nights)
                    </h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                  </div>
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
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
