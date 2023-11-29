import React from "react";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { useContext } from "react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const [Destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/monuments", { state: { Destination, date } });
  };
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid" style={{ justifyContent: "flex-end" }}>
          <div className="caldiv" style={{ margin: "0 30px 0 0" }}>
          
            <button
              onClick={() => setOpenDate(!openDate)}
              className="calbtn"
              style={{ borderRadius: "8px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-calendar-date"
                viewBox="0 0 16 16"
                style={{ margin: "8px" }}
              >
                <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>

              {`${format(date[0].startDate, "dd/MM/yyyy")} - ${format(
                date[0].endDate,
                "dd/MM/yyyy"
              )}`}
            </button>
          </div>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
              minDate={new Date()}
            />
          )}

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Where are you planning?"
              aria-label="Search"
              onChange={(e) => setDestination(e.target.value)}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "grey",
              }}
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
