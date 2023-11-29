import "./navbar.css";
import { AuthContext } from "../../context/authcontext";
import { useContext } from "react";
import {useNavigate } from "react-router-dom";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  const handle_add_mon =()=>{
    navigate("/create_mon");


  }
  const handle_check_order = () =>{
    navigate("/Admin/mon");
  }
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            EntryWay
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={{ justifyContent: "flex-end" }}
          >
            <ul className="navbar-nav">
              {user ? (
                
                <div className="user_name">
                  {user.isAdmin?(
                    <div>
                      <button className="add_mon_btn" type="button" onClick={handle_add_mon}>add mon</button>
                      <button className="add_mon_btn" type="button" onClick={handle_check_order}>check order</button>
                    </div>
                  ):(<div><button className="add_mon_btn" disabled onClick={handle_add_mon}>add_mon</button></div>)}
                  
                  <div className="name">{user.username}</div>

                  <div className="logout">
                    <button className="logout_btn" onClick={logoutUser}>
                      logout
                    </button>
                  </div>
                </div>
              ) : (
                <li className="nav-item" style={{ margin: "0 15px 0 15px" }}>
                  <a className="nav-link" href="/auth/login">
                    log in
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
