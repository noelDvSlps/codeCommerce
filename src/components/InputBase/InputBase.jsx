import React from "react";
import "./InputBase.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CARD, CARDICON } from "../constants";

const InputBase = ({
  errorMsgLeft,
  error,
  isCard,
  cardType,
  revealPassword,
  label,
  label2,
  errorM,
  myName,
  display,
  width,
  gap,
  spanTop,
  inputLeft,
  left,
  style,
  ...props
}) => (
  <label
    style={{
      width: width ? width : "100%",
      marginBottom: gap ? gap : 0,
      marginLeft: left ? left : null,
    }}
  >
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
          width: width ? "100%" : "auto",
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
        left: inputLeft ? inputLeft : null,
        width: width ? width : "100%",
        border: errorM && errorM !== "Required" && "1px solid red",
        backgroundColor: errorM && errorM !== "Required" && "#fae2e3",
        ...style,
      }}
      {...props}
    />

    {(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
      <img
        style={{
          position: "absolute",
          top: "3px",
          right: "20px",
          width: "50px",
          height: "33px",
        }}
        src={CARDICON[cardType]}
        alt="card"
      />
    )}
    {label2 && (
      <div style={{ marginBottom: "20px" }}>
        <div className="label">{label2}</div>
      </div>
    )}
  </label>
);

export default InputBase;
