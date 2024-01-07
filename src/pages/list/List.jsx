import axios from "axios";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { baseUrl } from "../../baseUrl";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import "./list.css";

const List = () => {
  //const location = useLocation();
  //const [destination, setDestination] = useState(location.state.destination);
  //const [dates, setDates] = useState(location.state.dates);
  const [dates, setDates] = useState();
  const [openDate, setOpenDate] = useState(false);
  //const [options, setOptions] = useState(location.state.options);
  const [options, setOptions] = useState('');
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //const { data, loading, error, reFetch } = useFetch(
    //`/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  //);
useEffect(() => {
  getHotelData()
}, [])

const getHotelData = async () =>{
  try {
    setLoading(true)
    const res = await axios.get(`${baseUrl}/api/hotels`)
    console.log("hotel res-->", res.data.message);
    setData(res.data.message)
    setLoading(false)
    
  } catch (error) {
    setLoading(false)
  console.log("hotel get error", error);    
  }
}


  const handleClick = () => {
    //reFetch();
  };

  console.log("search data", dates,);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder='city' type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              {/* <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span> */}
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    // placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    // placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    // placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
