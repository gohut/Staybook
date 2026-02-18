import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./loginpge.scss"
import loginpge from "../../../assets/loginpge.png"
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../../../authApi";   // ✅ NEW IMPORT

export default function Logincont({ onClose, onLoginSuccess }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ REAL LOGIN USING BACKEND
  const handleLogin = async () => {

    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {

      // 🔥 call backend login API
      const response = await loginUser({
        email,
        password
      });

      const token = response.data;

      // ✅ save JWT token
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);

      // OPTIONAL: decode role later (for now default user)
      localStorage.setItem("userRole", "user");

      // notify parent
      onLoginSuccess({ email, role: "user" });

      onClose();

      // redirect after login
      navigate("/");

    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='login-cont'>
      <div className="main-log-cont" onClick={(e) => e.stopPropagation()}>

        <div className="mnlg-cn-cls" onClick={onClose}>X</div>

        <div className="mm-lg-cn-img">
          <img src={loginpge} alt="Login" />
        </div>

        <div className="mm-lg-cn-cn1">
          <div className="mglgcn-cn11">

            <div className="cn111">Welcome back!</div>
            <div className="cn112">
              Get your tickets without any frustration, we are on your back!!!
            </div>

            <br /><br />

            {error && (
              <div style={{ color: 'red', marginBottom: '10px' }}>
                {error}
              </div>
            )}

            <div className="cn113">
              <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <br />

            <div className="cn114">
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="cn115">Forgot Password?</div>

            {/* ✅ LOGIN BUTTON */}
            <div className="cn116"
                onClick={() => {
                  console.log("LOGIN BUTTON CLICKED");
                  handleLogin();
                }}
              >
                Login
              </div>


            <div className="cn117">
              <div className="cn1171"></div>
              <div className="cn1172">or continue with</div>
              <div className="cn1173"></div>
            </div>

            <div className="cn118">
              <div className="cn1181">Sign with Google</div>
              <div className="cn1181"><FcGoogle /></div>
            </div>

            <div className="cn119">
              Don't have an account?
              <span style={{color:'blue', fontWeight:"bold", cursor:'pointer'}}>
                Sign up
              </span> Now
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
