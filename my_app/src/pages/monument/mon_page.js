import "./mon_page.css";
import Navbar from "../navbar/navbar";
import useFetch from "../../hooks/useFetch.js";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Mon = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const { data, loading} = useFetch(
    `/monuments/find/${id}`
  );

  return (
    <div>
      <Navbar />
      {loading ? (
        "loading"
      ) : (
        <div className="monContainer">
          <div className="monwrapper">
            <img className="mon_im" src={data.photos} alt="" />
            <div className="mon_min_details">
              <h1 className="montitle">{data.name}</h1>
              <div className="monAddress">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                  id="location _icon"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <span className="location_name"> {data.city} - Agra</span>
              </div>
            </div>
            <Link to={`/monuments/book/${data._id}`}>
              <div className="book_div">
                <button className="book_button">Book Now</button>
              </div>
            </Link>
          </div>
          <div className="max_details">
            <div className="left_info">
              <div className="mon_heading">About {data.name}</div>
              <div className="mon_desc">{data.description}</div>
              <hr />
            </div>
            <div className="mon_info_container">
              <div className="mon_info">Monument Information</div>
              <center>
                <hr className="under_info" />
              </center>
              <div className="main_ticket">
                <div className="ticket_info">
                  <h3 className="ticketinfohead">Ticket details</h3>
                  <div className="ticket_img">
                    <img
                    className="iimg"
                      src="https://res.cloudinary.com/drs7nvxpy/image/upload/v1674828771/entry_way/taj-blue_ze6jdh.png"
                      alt=""
                    />
                  </div>
                  <section className="term-c">
                    <p className="fs-md bold">Terms &amp; Conditions</p>
                    <ul>
                      <li>The e-ticket is not transferable.</li>
                      <li>Entry Fee is not refundable.</li>
                      <li>E-ticket cancellations are not permitted.</li>
                      <li>
                        The Monument is open for visitors between sunrise and
                        sunset.
                      </li>
                    </ul>
                  </section>
                </div>
                <div className="ticket_details">
                  <div className="adult_price">
                    <h5>For Adults</h5>
                    <div className="ticket_rate"> Total ₹ {data.adult_price}</div>
                  </div>
                  <br />

                  <div className="children_price">
                    <div className="t_rate">
                      <span>
                        <h5>For children</h5>
                      </span>
                      <span>(2 - 11)</span>
                    </div>
                    <div className="ticket_rate">
                      {" "}
                      Total ₹ {data.child_price}
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Mon;
