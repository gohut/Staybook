import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./loginpge.scss"
import loginpge from "../../../assets/loginpge.png"
import { FcGoogle } from "react-icons/fc";
import { loginApi, registerApi } from "../../../Api/authApi.js";
export default function Logincont({ onClose, onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
const handleLogin = async () => {
  try {
    const token = await loginApi(email, password);
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email);

    navigate("/user");

  } catch (err) {
    setError(err.message);
  }
};

  
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
  if (password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  try {
    await registerApi(name, email,password);
    alert('Registration successful! Please login.');
    toggleForm(); 
  } catch (err) {
    setError(err.message || 'Something went wrong');
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
        <div className="mm-lg-cn-img"><img src={loginpge} alt="Login" /></div>
        <div className="mm-lg-cn-cn1">
          <div className={`mglgcn-cn11 ${isSignup ? 'signup-mode' : 'login-mode'}`}>
            <div className="cn111">{isSignup ? 'Create Account' : 'Welcome back!'}</div>
            <div className="cn112">
              {isSignup 
                ? 'Join us and get your tickets hassle-free!' 
                : 'Get your tickets without any frustration, we are on your back!!!'}
            </div>
            <br /><br />
            
            {error && <div className="error-message">{error}</div>}
            
            {isSignup && (
              <>
                <div className="cn113">
                  <input 
                    type="text" 
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
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
            
            {isSignup && (
              <>
                <br />
                <div className="cn114">
                  <input 
                    type="password" 
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </>
            )}
            
            {!isSignup && <div className="cn115">Forgot Password?</div>}
            
            <div className="cn116" onClick={isSignup ? handleSignup : handleLogin}>
              {isSignup ? 'Sign Up' : 'Login'}
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
              {isSignup ? (
                <>Already have an account? <span onClick={toggleForm}>Back to Login</span></>
              ) : (
                <>Don't have an account? <span onClick={toggleForm}>Sign up</span> Now</>
              )}
            </div>
          </div>
        </div>
      </div>    
    </div>
  )
}