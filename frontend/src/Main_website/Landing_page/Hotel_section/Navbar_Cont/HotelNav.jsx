import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function HotelNav() {
    const navigate = useNavigate();

  return (
    <div>
              <div className="hotels-menu-cont" >
        <div className="hm-cont1" >
          <div
            className="hmc1-c1"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div>
           
              <input type="radio" />
            </div>
            <div>upto 4 Rooms</div>
          </div>
          <div
            className="hmc1-c2"
            style={{ display: "flex", alignItems: "center", gap: "3px" }}
          >
            <div>
         
              <input type="radio" />
            </div>
            <div>Group Deals</div>
          </div>
          <div className="hmc1-c3" style={{ fontWeight: "bold" }}>
            <div>
              Book Domestic and International Property Online, to list your
              property <span style={{ color: "blue" }}>Click Here</span>
            </div>
          </div>
        </div>
        <div className="hm-cont2">
          <div
            className="hmc2-c1"
            style={{
              width: "400px",
              padding: "10px 10px",
              borderRight: "solid  1px lightgrey",
            }}
          >
            <div className="hmc21-li">city, Property name or Location</div>
            <div className="hmc21-dk">Goa</div>
            <div className="hmc21-li">India</div>
          </div>
          <div
            className="hmc2-c2"
            style={{width:"150px",padding:"10px 10px" , borderRight: "solid  1px lightgrey" }}
          >
            <div
              className="hmc21-li"
              style={{
      
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              check In <MdKeyboardArrowDown className="downarr" />
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <span className="hmc21-dk">8</span>
              <div
                className="hmc21-li"
                style={{ transform: "translateY(22px)" }}
              >
               
                jan'26
              </div>
            </div>
            <div className="hmc21-li">Thursday</div>
          </div>
          <div
            className="hmc2-c3"
            style={{width:"150px",padding:"10px 10px" , borderRight: "solid  1px lightgrey" }}
          >
            <div
              className="hmc21-li"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              check Out <MdKeyboardArrowDown className="downarr" />
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              <span className="hmc21-dk">8</span>
              <div
                className="hmc21-li"
                style={{ transform: "translateY(22px)" }}
              >
                {" "}
                jan'26
              </div>
            </div>
            <div className="hmc21-li">Thursday</div>
          </div>
          <div className="hmc2-c4" style={{width:"150px",padding:"10px 10px",borderRight: "solid  1px lightgrey" }}>
            <div
              className="hmc21-li"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              Rooms & Guests <MdKeyboardArrowDown className="downarr" />
            </div>
            <div className="hmc21-li">
              <span className="hmc21-dk">1</span> Rooms{" "}
              <span className="hmc21-dk">2</span> Adults
            </div>
          </div>
                    <div className="hmc2-c4" style={{width:"150px",padding:"10px 10px" }}>
            <div
              className="hmc21-li"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              Price Per Night <MdKeyboardArrowDown className="downarr" />
            </div>
            <div style={{fontWeight:"bold"}}>$0-$1500,<br /> $1500-$2500,... </div>
          </div>
        </div>
        <div className="hm-cont3" style={{display:"flex", gap:"5px"}}>
          <div className="hmc21-li">Trending Searches:  </div>
          <div  style={{display:"flex", gap:"5px"}}>
            <div className="hmcon3-el">Singapore, Singapore</div>
             <div className="hmcon3-el">Singapore, Singapore</div>
              <div className="hmcon3-el">Singapore, Singapore</div>
          </div>
        </div>
      </div>

       <button className="vh-search-btn" onClick={() => navigate("/hotel2")} style={{position:"absolute", transform:"translate(660px,-50px)"}}>SEARCH</button>

    </div>
  )
}
