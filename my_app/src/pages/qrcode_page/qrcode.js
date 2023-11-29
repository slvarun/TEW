import "./qrcode.css";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Qrcode = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { data} = useFetch(
    `/bookingorder/monuments/book/${location.state.bid}/qr`
  );

  const [src, setSrc] = useState("");

  useEffect(() => {
    QRCode.toDataURL(
      `name : ${data.name}, city: ${data.city}, address: ${data.address}, no.of adults: ${data.adult}, no.of children: ${data.children}, total fee: ${data.total_fee}, email: ${data.email}`
    ).then((i) => {
      setSrc(i);
    });
  });
  const redirect = () => {
    navigate(`/`);
  };

  return (
    <div className="qr_holder">
      <center>
        <div className="data_holder">
          <img
            id="tick"
            src="https://res.cloudinary.com/drs7nvxpy/image/upload/v1676469185/entry_way/tick-icon-sign-symbol-design-free-png_xuxky5.webp"
            alt=""
          />
          <div className="text">
            <h2>congratulations!</h2>
            <br />
            <h3>You have booked your ticket</h3>
            <br />
            <h3>
              download the ticket and scan the qr code at the monument entrance
            </h3>
            <br />
            <h2>Happy Holiday</h2>
          </div>

          <img className="qrcode_img" src={src} alt="none" />
        </div>
      </center>
      <center>
        <button type="button" className="red" onClick={redirect}>
          ok
        </button>
      </center>
    </div>
  );
};

export default Qrcode;
