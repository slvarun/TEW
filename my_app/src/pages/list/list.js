import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import useFetch from "../../hooks/useFetch";
import { format } from "date-fns";

import Navbar from "../navbar/navbar";
import SearchItem from "../searchItem/Searchitem.js";

import "./list.css";

const List = () => {
  const location = useLocation();
  const [Destination, setDestination] = useState(location.state.Destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined); // Declare min state
  const [max, setMax] = useState(undefined); // Declare max state
  const { data, loading, reFetchData } = useFetch(
    `https://entry-way-backend.onrender.com/monuments?city=${Destination}&min=${min ?? 0}&max=${max ?? 3000}`
  );

  const handleSearch = () => {
    reFetchData();
  };

  return (
    <div>
      <Navbar />
      <div className="listcontainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={Destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="lsItem-min">
              <label>min-budget</label>
              <input onChange={(e) => setMin(e.target.value)} type="number" />
            </div>
            <div className="lsItem-max">
              <label>max-budget</label>
              <input onChange={(e) => setMax(e.target.value)} type="number" />
            </div>
            <div className="lsItem">
              <label>Check-in-date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, "dd/MM/yyyy")} - ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <button onClick={handleSearch} className="search_btn">
              Search
            </button>
          </div>
          <div className="listresult">
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
