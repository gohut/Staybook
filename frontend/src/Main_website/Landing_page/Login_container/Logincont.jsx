import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./loginpge.scss"
import loginpge from "../../../assets/loginpge.png"
import { FcGoogle } from "react-icons/fc";
import { loginApi, registerApi } from "../../../Api/authApi.js"
import { jwtDecode } from "jwt-decode";
export default function Logincont({ onClose, onLoginSuccess }) {

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ LOGIN CONNECTED TO BACKEND
  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const data = await loginApi(email.trim(), password.trim());

      // Save JWT

      if (onLoginSuccess) {
        onLoginSuccess({ data});
      }

      onClose();
   if (data.role === "ADMIN")         navigate("/admin");
   else if (data.role === "PARTNER")  navigate("/partner");
   else if(data.role=="TRAVELER")     navigate("/user");  
    else {
      navigate("/");
    }

    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  // ✅ REGISTER CONNECTED TO BACKEND
  const handleSignup = async () => {
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerApi(
        name.trim(),
        email.trim(),
        password.trim()
      );

      alert("Registration successful. Please login.");
      setIsSignup(false);

    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      isSignup ? handleSignup() : handleLogin();
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
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

            <div className="cn111">
              {isSignup ? "Create Account" : "Welcome back!"}
            </div>

            <div className="cn112">
              Get your tickets without any frustration, we are on your back!!!
            </div>

            <br /><br />

            {error && (
              <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                {error}
              </div>
            )}

            {isSignup && (
              <>
                <div className="cn113">
                  <input
                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                <br />
              </>
            )}

            <div className="cn113">
              <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            <br />

            <div className="cn114">
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            {isSignup && (
              <>
                <br />
                <div className="cn114">
                  <input
                    type="password"
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </>
            )}

            <div className="cn115">Forgot Password?</div>

            <div className="cn116" onClick={isSignup ? handleSignup : handleLogin}>
              {isSignup ? "Sign Up" : "Login"}
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
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span
                style={{ color: 'blue', fontWeight: "bold", cursor: 'pointer', marginLeft: "5px" }}
                onClick={toggleForm}
              >
                {isSignup ? "Login" : "Sign up"}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}