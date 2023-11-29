import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css"
const Featured = () => {
  const {data, loading, error} = useFetch("/monuments/countByCity?cities=secbad,Agra,Hyderabad")
  
  return (
    <div className="featured_items">
      {loading ?("loading please wait"):(<><div className="featured">
        <img
          src="https://res.cloudinary.com/drs7nvxpy/image/upload/v1674662522/entry_way/taj_hbppj6.jpg"
          alt=""
          className="featuredimg"
        />
        <div className="featuredtitles">
          <h3>Agra</h3>
          <h4>{data[1]} properties</h4>
        </div>
      </div>
      <div className="featured">
        <img
          src="https://res.cloudinary.com/drs7nvxpy/image/upload/v1671033283/entry_way/charminar_qtzdks.jpg"
          alt=""
          className="featuredimg"
        />
        <div className="featuredtitles">
          <h3>Hyderabad</h3>
          <h4>{data[2]} properties</h4>
        </div>
      </div>
      <div className="featured">
        <img
          src="https://res.cloudinary.com/drs7nvxpy/image/upload/v1674662549/entry_way/qutub_minar_otlunn.jpg"
          alt=""
          className="featuredimg"
        />
        <div className="featuredtitles">
          <h3>secunderabad </h3>
          <h4>{data[0]} properties</h4>
        </div>
      </div></>)}
    </div>
  );
};

export default Featured;
