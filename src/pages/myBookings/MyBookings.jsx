import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";


const MyBookings = () => {

  const [data, setData] = useState([]);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  console.log('user', user);

  useEffect(() => {
    const datass = async () => {
      const res = await axios.get(`${baseUrl}/api/order/${user._id}`);
      console.log("taxi", res);
      setData(res.data);
    };
    datass();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 410,
      renderCell: (param) => <div className="userr">{param.row._id}</div>,
    },
    {
      field: "orderType",
      headerName: "Order Type",
      width: 140,
      style: { color: "red" },
      renderCell: (param) => <div className="userr">{param.row.serviceType}</div>,
    },
    {
      field: "start Date",
      headerName: "start Date",
      width: 240,
      renderCell: (param) => (
        <div className="userr">{param.row.startDate}</div>
      ),
    },
    {
        field: "End Date",
        headerName: "End Date",
        width: 240,
        renderCell: (param) => (
          <div className="userr">{param.row.endDate}</div>
        ),
      },
    {
      field: "totalPrice",
      headerName: "totalPrice",
      width: 240,
      renderCell: (param) => (
        <div className="userr">{param.row.totalPrice}</div>
      ),
    },
  ]
  return (
    <div>
      <Navbar />

      <h1 style={{textAign: 'center',margin: '50px',fontSize: '26px', fontWeight: 'bold',color: 'blue'}}>My Order History</h1>

      <div className="room_page_table">
          <DataGrid
            className="data_grid"
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
     
    </div>
  );
};

export default MyBookings;
