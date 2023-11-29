import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authcontext.js";
import Reserve from "../reserve/reserve";
import { useEffect } from "react";
import QRCode from "qrcode";
import "./separate_qr.css"


const A_qr_Block = ({ item }) => {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
      navigate(`/Admin/${item._id}`);
  };
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(
      `name : ${item.name}, city: ${item.city}, address: ${item.address}, no.of adults: ${item.adult}, no.of children: ${item.children}, total fee: ${item.total_fee}, email: ${item.email}`
    ).then((i) => {
      setSrc(i);
    });
  });



  return (
    <div className="cover">
      <div className="mon_container">
        <div className="mon_cards">
          <div className="card">
            <div className="mon_image">
              <img className="mon_img" style={{"marginTop":"20px"}} src={src} alt="" />
              <div>
                <div className="monrating" >{`${item.name}`}</div>
              </div>
              <div className="mon_min_details">
                
                <div className="place">{`${item.city}`}</div>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
      {openModal && <Reserve setOpen={setOpenModal} />}
    </div>
  );
};

export default A_qr_Block;
