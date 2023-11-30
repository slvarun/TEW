import { Link } from "react-router-dom";
import "./Searchitem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img className="siImage" src={item.photos} alt="" />
      <div className="siDesc">
        <div className="mon_name_place">
          <span className="mon_name">{item.name}</span>
          <span className="mon_divider"> - </span>
          <span className="mon_place">{item.city}</span>
        </div>

        <span className="mon_disc">{item.description}</span>
        <span className="mon_info" style={{ fontSize: "20px", color: "red" }}>
          mind your luggage
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{`★ ${item.rating}`}</button>
          </div>
        )}
        <div className="sidetailTexts">
          <span className="siprice">{`₹ ${item.adult_price}`}</span>
          <span className="siTax">Includes tax and fee</span>
          <Link to={`/monuments/${item._id}`}>
            <button className="siCheckbutton">Search availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
