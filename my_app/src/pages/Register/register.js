import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
const Register = () => {
  
  





const[toggle, setToggle] = useState(false)





  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      console.log(credentials)
      await axios.post("/auth/register", credentials);
      navigate("/");
      
    } catch (err) {
      console.log(err)
    }
  };
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    isAdmin: toggle,
  });
  

  return (
    <div>
      <div className="REGISTER">
        <div className="lContainer">
          <div className="userfirstname">EntryWay</div>
          <div className="inputs_section">
            <input
              
              placeholder="username"
              id="username"
              onChange={handleChange}
              className="lInput"
            />
            <input
              
              placeholder="email"
              id="email"
              onChange={handleChange}
              className="lInput"
            />
            <input
              
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                
                
                
                

                
              />
              <label className="form-check-label">
                Is Admin ?
              </label>
            </div>
          </div>
          <div className="responcemsg">
            {/* {error && <span>{error.message}</span>} */}
          </div>

          <div className="btns">
            <button
              // disabled={loading}
              onClick={handleRegister}
              className="lButton"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
