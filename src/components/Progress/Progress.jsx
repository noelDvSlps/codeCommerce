import React from "react";
import {
  faShippingFast,
  faCreditCard,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Progress.css";

let iconData = [
  { processNumber: 1, icon: faCheck, zIndex: 4 },
  { processNumber: 2, icon: faShippingFast, zIndex: 3 },
  { processNumber: 3, icon: faCreditCard, zIndex: 2 },
  { processNumber: 4, icon: faCheck, zIndex: 1 },
];

const Progress = ({ processNumber }) => (
  <div style={{ textAlign: "center", minWidth: "350px",marginBottom: "25px" }}>
    {iconData.length
      ? iconData.map((item, index) => (
          <span key = {index} style={{ zIndex: item.zIndex }}>
            {item.processNumber !== 1 && (
              <span
                className="lineBetween"
                style={{
                  backgroundColor:
                    processNumber >= item.processNumber ? "gray" : "lightgray",
                }}
              ></span>
            )}
            <span
              className="iconProgress"
              style={{
                backgroundColor:
                  processNumber >= item.processNumber ? "gray" : "lightgray",
              }}
            >
              <FontAwesomeIcon className="FontAwesomeIcon" icon={item.icon} />
            </span>
          </span>
        ))
      : null}
  </div>
);

export default Progress;
