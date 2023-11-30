import "./add_mon.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  useState } from "react";

const Add_mon = () => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(credentials);
      await axios.post(`https://entry-way-backend.onrender.com/monuments/create_mon`, credentials);
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  const [credentials, setCredentials] = useState({
    name: undefined,
    description: undefined,
    city: undefined,
    adult_price: undefined,
    child_price: undefined,
    photos: undefined,
    rating: undefined,
    address: undefined,
  });

  return (
    <center>
      <div>
        <div className="heading">
          <h1>Add monumnet</h1>
        </div>
        <div className="form_div">
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">monument name</label>
              <input
                onChange={handleChange}
                className="form-control"
                id="name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">city</label>
              <input
                onChange={handleChange}
                className="form-control"
                id="city"
              />
            </div>
            <div className="col-12">
              <label className="form-label">description</label>

              <textarea
                onChange={handleChange}
                id="description"
                className="form-control"
                cols="30"
                rows="4"
              ></textarea>
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <input
                onChange={handleChange}
                className="form-control"
                id="address"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">photo</label>
              <input
                type={"text"}
                onChange={handleChange}
                className="form-control"
                id="photos"
              />
              <img src={`${credentials.photos}`} alt="" />
            </div>

            <div className="col-md-2">
              <label className="form-label">Adult price</label>
              <input
                onChange={handleChange}
                type={"number"}
                className="form-control"
                id="adult_price"
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">children price</label>
              <input
                onChange={handleChange}
                type={"number"}
                className="form-control"
                id="child_price"
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">rating</label>
              <input
                onChange={handleChange}
                type={"number"}
                className="form-control"
                id="rating"
              />
            </div>

            <div className="col-12">
              <button
                type={"button"}
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </center>
  );
};

export default Add_mon;
