import React from 'react'
import "./loginpge.css"
import loginpge from "../assets/loginpge.png"
import { FcGoogle } from "react-icons/fc";
export default function Logincont({ showlgn, onClose }) {

  return (
    <div className='login-cont'>
         <div className="main-log-cont" onClick={(e) => e.stopPropagation()}>
            <div className="mnlg-cn-cls" onClick={onClose}>X</div>
            <div className="mm-lg-cn-img"><img src={loginpge}/></div>
            <div className="mm-lg-cn-cn1">
                <div className="mglgcn-cn11">
                            <div className="cn111">Welcome back!</div>
                            <div className="cn112">Get you ticktes without out any frustation, we are on your back!!!</div>
                            <br /><br />
                            <div className="cn113"><input type="text" placeholder='Username'/></div>
                            <br />
                             <div className="cn114"><input type="text" placeholder='password'/></div>
                              <div className="cn115">Forgot Password?</div>
                              <div className="cn116">Login</div>
                              <div className="cn117">
                                  <div className="cn1171"></div>
                                   <div className="cn1172">or continue with</div>
                                    <div className="cn1173"></div>
                              </div>

                              <div className="cn118">
                                 <div className="cn1181">sign with Google</div>
                                 <div className="cn1181"><FcGoogle /></div>
                              </div>

                              <div className="cn119" >Don't have any accout, <span style={{color:'blue', fontWeight:"bold"}}>sign in</span> Now</div>

                </div>
            </div>
        </div>    
    </div>
  )
}
