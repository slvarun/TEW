import React from "react";
import Header from "../header/header";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import A_qr_Block from "./saperate_qr";
import "../homepage/home.css";
const A_qr_Home = () => {
    const location = useLocation();

  const id = location.pathname.split("/")[2];
  const { data, loading } = useFetch(`/admin/Admin/${id}?id=${id}`);
  
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
                  <A_qr_Block item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </center>
      </div>
    </div>
  );
};

export default A_qr_Home;
