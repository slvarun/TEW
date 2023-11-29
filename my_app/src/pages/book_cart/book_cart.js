import "./book_cart.css";
import useFetch from "../../hooks/useFetch.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";
import { useContext, useState } from "react";
import Navbar from "../navbar/navbar";
import axios from "axios";

const Book = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const location = useLocation();
  const { user } = useContext(AuthContext);
  const result = Math.random().toString(36).substring(2, 7);
  const id = location.pathname.split("/")[3];
  const { data, loading, error, reFetchData } = useFetch(
    `/monuments/find/${id}`
  );
  const ap = data.adult_price;
  const cp = data.child_price;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(credentials);
      await axios.post(`/bookingorder/monuments/book/${data._id}`, credentials);
      navigate(`/monuments/book/${credentials._id}/qr`, {
        state: { id: 1, bid: credentials._id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [openOptions, setOpenOptions] = useState(false);
  const [price, setPrice] = useState({
    adult: 500,
    children: 0,
    tax: 299,
    totalPrice: 0,
  });

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
    setCredentials((prev) => ({ ...prev, mon_place: data.address }));
    setPrice((prev) => {
      return {
        ...prev,
        [name]:
          name === "adult"
            ? operation === "i"
              ? price[name] + ap
              : price[name] - ap
            : operation === "i"
            ? price[name] + cp
            : price[name] - cp,
      };
    });
  };
  const tp = price.adult + price.children + price.tax + price.totalPrice;
  const close = () => {
    setOpenOptions(!openOptions);
    setPrice((prev) => {
      return {
        ...prev,
        totalPrice: tp,
      };
    });
    console.log(tp);
    setCredentials((prev) => ({ ...prev, adult: options.adult }));
    setCredentials((prev) => ({ ...prev, children: options.children }));
    setCredentials((prev) => ({ ...prev, total_fee: tp }));
  };
  const [credentials, setCredentials] = useState({
    _id: result,
    email: undefined,
    phone: undefined,
    name: undefined,
    address: undefined,
    city: undefined,
    identity: undefined,
    identitynum: undefined,
    adult: options.adult,
    children: options.children,
    mon_name: `${id}`,
    mon_place: undefined,
    total_fee: price.totalPrice,
  });
  return (
    <div className="main">
      {loading ? (
        "loading"
      ) : (
        <div>
          <div className="book_title">
            <h1>Your Bookings</h1>
          </div>
          <div className="page_container">
            <div className="left_div">
              <div className="cards">
                <div className="details_container">
                  <div className="img">
                    <div className="img-rep">
                      <img className="img_src" src={data.photos} alt="" />
                    </div>
                  </div>
                  <div className="m_details">
                    <div className="pay-detail fl">
                      <div>
                        <p className="f-bold">{data.name}</p>
                        <p className="f-small">{data.city}</p>
                        <hr />
                      </div>
                      <div className="pay-footer mt10">
                        <p>
                          <a
                            onClick={() => setOpenOptions(!openOptions)}
                            className="color-blue under-link"
                          >
                            Update No.of passengers
                          </a>
                        </p>
                      </div>
                      <hr />
                      <div className="pay-footer mt10">
                        <span>Travellers - </span>
                        <span>
                          {`${options.adult} adult - ${options.children} children`}
                        </span>
                      </div>
                      <hr />
                    </div>
                  </div>
                  <div className="Totalprice">
                    <div className="info">
                      <span>
                        <label className="inko_key">Adult</label>
                      </span>
                      <span>
                        <div className="Adult" id="info_value">{price.adult}</div>
                      </span>
                    </div>
                    <div className="info">
                      <span>
                        <label className="inko_key">Children</label>
                      </span>
                      <span>
                        <div className="children" id="info_value">{price.children}</div>
                      </span>
                    </div>
                    <div className="info">
                      <span>
                        <label className="inko_key">tax</label>
                      </span>
                      <span>
                        <div className="tax" id="info_value">{price.tax}</div>
                      </span>
                    </div>
                    <div className="info">
                      <span>
                        <label className="inko_key">total</label>
                      </span>
                      <span>
                        <div className="total" id="info_value">{price.totalPrice}</div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form">
                <div className="cards">
                  <div className="contact_details_div">
                    <div className="cde_head">
                      <h4>Contact details</h4>
                    </div>
                    <form className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone number</label>
                        <input
                          type="number"
                          className="form-control"
                          id="phone"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Passenger Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Apartment, studio, or floor"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Identity type</label>
                        <input
                          type="text"
                          className="form-control"
                          id="identity"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Enter Id number</label>
                        <input
                          type="number"
                          className="form-control"
                          id="identitynum"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="my_counter">
                        {openOptions && (
                          <div className="options">
                            <div className="optionItem">
                              <span className="optionText">Adult</span>
                              <div className="optionCounter">
                                <button
                                  type="button"
                                  className="optionCounterButton"
                                  disabled={options.adult <= 1}
                                  onClick={() => handleOption("adult", "d")}
                                >
                                  -
                                </button>
                                <span
                                  id="adults"
                                  className="optionCounterNumber"
                                >
                                  {options.adult}
                                </span>
                                <button
                                  type="button"
                                  className="optionCounterButton"
                                  onClick={() => handleOption("adult", "i")}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="optionItem">
                              <span className="optionText">children</span>
                              <div className="optionCounter">
                                <button
                                  type="button"
                                  className="optionCounterButton"
                                  disabled={options.children <= 0}
                                  onClick={() => handleOption("children", "d")}
                                >
                                  -
                                </button>
                                <span
                                  onChange={handleChange}
                                  id="children"
                                  className="optionCounterNumber"
                                >
                                  {options.children}
                                </span>
                                <button
                                  type="button"
                                  className="optionCounterButton"
                                  onClick={() => handleOption("children", "i")}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="set_div">
                              <button
                                type="button"
                                onClick={close}
                                className="setButton"
                              >
                                Set
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="right_div">
              <div className="cards">
                <section className="term-section">
                  <p className="review-head">Terms &amp; Conditions</p>
                  <ul className="t-c_clearfix">
                    <li>The e-ticket is not transferable.</li>
                    <li>Entry Fee is not refundable.</li>
                    <li>E-ticket cancellations are not permitted.</li>
                    <li>
                      The Monument is open for visitors between sunrise and
                      sunset.
                    </li>
                    <li>
                      Visitor shall be required to show photo identity proof in
                      original at the entry to the monument.
                    </li>
                    <li>Edibles are not allowed inside the monument.</li>
                    <li>
                      Inflammable/dangerous/explosive articles are not allowed.
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Book;
