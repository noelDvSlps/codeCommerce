import React from "react";
import "./InputBase.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputBase = ({
  revealPassword,
  label,
  label2,
  errorM,
  myName,
  display,
  width,
  gap,
  spanTop,
  left,
  style,
  ...props
}) => (
  <label style={{ width: width ? "auto" : "100%", marginBottom: gap ? gap : 0 }}>
    {myName === "password" && (
      <span className="icon" onClick={revealPassword}>
        <FontAwesomeIcon
          id="hidePasswordIcon"
          style={{
            height: "1rem",
            visibility: "visible",
            position: "absolute",
            zIndex: 100,
          }}
          icon={faEyeSlash}
        />
        <FontAwesomeIcon
          id="showPasswordIcon"
          style={{
            height: "1rem",
            visibility: "hidden",
            position: "absolute",
            zIndex: 100,
          }}
          icon={faEye}
        />
      </span>
    )}

    <div className="label" style={{ display: display ? display : "inline" }}>
      {label}
    </div>
    {errorM && (
      <span
        className="error"
        style={{
          width: width ? width : "auto",
          position: "absolute",
          right: 0,
          top: spanTop && spanTop,
        }}
      >
        {errorM}
      </span>
    )}

    <input
      className="input-root"
      style={{

        left: left ? left : null,
        width: width ? width : "100%",
        border: errorM && errorM !== "Required" && "1px solid red",
        backgroundColor: errorM && errorM !== "Required" && "#fae2e3",
        ...style
      }}
      {...props}
    />
    {label2 && (
      <div style={{ marginBottom: "20px" }}>
        <div className="label">{label2}</div>
      </div>
    )}
  </label>
);

export default InputBase;
