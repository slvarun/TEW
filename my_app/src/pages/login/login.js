import "./login.css";
import { AuthContext } from "../../context/authcontext";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
        <div className="userfirstname">EntryWay</div>
        <div className="inputs_section">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="responcemsg">
          {error && <span>{error.message}</span>}
        </div>

        <div className="btns">
          <button disabled={loading} onClick={handleLogin} className="lButton">
            Login
          </button>
          {/* <button
            disabled={loading}
            onClick={handleRedirect}
            className="lButton"
          >
            Register
          </button> */}
        </div>
        <div className="register_redirect" style={{"marginTop": "20px"}}>
          <p>
            do not have account?<a href="/auth/register">signup</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
