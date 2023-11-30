import React from "react";
import Navbar from "../navbar/navbar";
import Header from "../header/header";
import useFetch from "../../hooks/useFetch";

import Mon_Block from "../mon_block/mon_home_block";
import "./home.css";
const Home = () => {
  const { data, loading } = useFetch("https://entry-way-backend.onrender.com/monuments");
  return (
    <div>
      <Navbar />
      <Header />
      <div className="grid-container">
        <center>
        <div className="Title">Monuments</div>
        {/* <Featured/> */}

        <div className="cont">
          {loading ? (
            "loading"
          ) : (
            <>
              {data.map((item) => (
                <Mon_Block item={item} key={item._id} />
              ))}
            </>
          )}
        </div>
        </center>
      </div>
    </div>
  );
};

export default Home;
