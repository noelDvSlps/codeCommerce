import React from "react";
import {  faShippingFast, faCreditCard, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Progress = ({
   ...props
}) => (
    <div style={{ textAlign: "left" }}>

            <span className="close-icon" style = {{backgroundColor: "gray", padding: "10px", borderRadius: "50%"}}>
                <FontAwesomeIcon color="white" fontSize={"20px"} icon={faCheck} />
              </span >
              <span style = {{backgroundColor: "gray", height: "3px", paddingLeft: "25%", margin: "0 -10px", fontSize: "0.5rem"}}></span>
                   
              
              <span className="close-icon" style = {{backgroundColor: "gray", padding: "10px", borderRadius: "50%" , zIndex: "100"}}>
                <FontAwesomeIcon color="white" fontSize={"20px"} icon={faShippingFast} />
              </span>

              <span style = {{backgroundColor: "lightgray", height: "3px", paddingLeft: "25%", margin: "0 -10px", fontSize: "0.5rem"}}></span>
              <span className="close-icon" style = {{backgroundColor: "lightgray", padding: "10px", borderRadius: "50%",zIndex: "100"}}>
                <FontAwesomeIcon color="white" fontSize={"20px"} icon={faCreditCard} />
              </span>
              <span style = {{backgroundColor: "lightgray", height: "3px", paddingLeft: "25%", margin: "0 -10px", fontSize: "0.5rem"}}></span>
              <span className="close-icon" style = {{backgroundColor: "lightgray", padding: "10px", borderRadius: "50%", zIndex: "100"}}>
                <FontAwesomeIcon color="white" fontSize={"20px"} icon={faCheck} />
              </span>
            </div>
  
  
);

export default Progress;
