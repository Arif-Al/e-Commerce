import React, { useEffect } from "react";
import { useState } from "react";
import PageNotFound from "../page-not-found/PageNotFound";
import { useNavigate } from "react-router-dom";

const ProtectRout = ({ children }) => {
  const [token, setToken] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  if (token) {
    return <> {children} </>;
  } else {
    navigate('/sign-in')
  }
};

export default ProtectRout;
