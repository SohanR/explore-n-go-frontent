import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Register = () => {
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [fullname, setFullname] = useState("");
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");

  const [phone, setPhone] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const eChng = (e) => {
    setEmail(e.target.value);
  };
  const fnChng = (e) => {
    setEmail(e.target.value);
  };
  const pChng = (e) => {
    setPass(e.target.value);
  };

  const cChng = (e) => {
    setCountry(e.target.value);
  };
  const uChng = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
        setLoading(true)
      const res =  await axios.post(`${baseUrl}/api/user/signup`,{
            email:email,
            password:pass,
            fullname:fullname,
            country:country,            
        })

        console.log('sussecc', res);
        setLoading(false)
        navigate('/login');
    } catch (error) {
        console.log('register error', error);
        setLoading(false)
    }
  }

  return (
 <>
 
      <Navbar/>
 <div className="login ">
      <form className="lContainer shadow-xl bg-white p-16  rounded-xl" onSubmit={handleSubmit}>
        <h3>Please Register</h3>
        <input
          type="email"
          placeholder="Email"
          onChange={eChng}
          className="lInput rounded  border-2 border-gray-200"
        />

        <input
          type="text"
          placeholder="Full Name"
          id="username"
          onChange={fnChng}
          className="lInput rounded  border-2 border-gray-200"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={uChng}
          className="lInput rounded  border-2 border-gray-200"
        />
        <input
          type="text"
          placeholder="Country"
          id="username"
          onChange={cChng}
          className="lInput rounded  border-2 border-gray-200"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={pChng}
          className="lInput rounded  border-2 border-gray-200"
        />
        <button
          type="submit"      className="bg-blue-400 rounded py-2"     
          value={loading ? "Loading..." : "Submit"}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >Register</button>

        {error && <span>{error.message}</span>}

        <p style={{ marginTop: "10px" }}>
          <Link to="/login"> Already have an account? Log in here..</Link>
        </p>
      </form>
    </div>
    <Footer/>
 </>
  );
};

export default Register;
