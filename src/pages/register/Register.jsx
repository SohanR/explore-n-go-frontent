import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";

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
    <div className="login">
      <form className="lContainer" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={eChng}
          className="lInput"
        />

        <input
          type="text"
          placeholder="Full Name"
          id="username"
          onChange={fnChng}
          className="lInput"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={uChng}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Country"
          id="username"
          onChange={cChng}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={pChng}
          className="lInput"
        />
        <button
          type="submit"          
          value={loading ? "Loading..." : "Submit"}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >Register</button>

        {error && <span>{error.message}</span>}

        <p style={{ marginTop: "10px" }}>
          <Link href="/login"> Already have an account? Log in here..</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
