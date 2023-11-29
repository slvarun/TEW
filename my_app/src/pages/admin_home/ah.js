import React from "react";
import Navbar from "../navbar/navbar";
import Header from "../header/header";
import useFetch from "../../hooks/useFetch";


import A_Mon_Block from "../admin_mon_block/admin_mon_block.js";
import "../homepage/home.css";
const A_Home = () => {
  const { data, loading } = useFetch(`/monuments`);
  return (
    <div>

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
                <A_Mon_Block item={item} key={item._id} />
              ))}
            </>
          )}
        </div>
        </center>
      </div>
    </div>
  );
};

export default A_Home;
