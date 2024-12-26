import React, { useEffect } from "react";
import { useState } from "react";
import PageNotFound from "../page-not-found/PageNotFound";

const ProtectRout = ({ children }) => {
  const [token, setToken] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  if (token) {
    return <> {children} </>;
  } else {
    return <div > <PageNotFound /> </div>;
  }
};

export default ProtectRout;
