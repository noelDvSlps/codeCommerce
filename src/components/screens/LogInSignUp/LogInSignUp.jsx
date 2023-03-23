import React from "react";
import "../../../../src/index.css";
import InputBase from "../../InputBase/InputBase";
//import styles from "./LogInSignUp.module.css";
import "../LogInSignUp/LogInSignUp.css";
import {
  ValidateEmail,
  onlyTextValidation,
  passwordValidation,
  confirmPasswordValidation,
  onlyNumberValidation,
} from "../../validations";

import { keyGenerator } from "../../keyGenerator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

class LogInSignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      screen: "signIn",
      error: {},
      userTempData: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        postCode: "",
      },
      userDatabase: props.userDatabase,
    };
  }

  refreshTempData = () => {
    this.setState({
      error: {},
      userTempData: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        postCode: "",
      },
    });
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  revealPassword = (e) => {
    e.preventDefault();
    if (document.getElementById("password").getAttribute("type") === "text") {
      document.getElementById("password").type = "password";
      document.getElementById("hidePasswordIcon").style.visibility = "visible";
      document.getElementById("showPasswordIcon").style.visibility = "hidden";
    } else {
      document.getElementById("password").type = "text";
      document.getElementById("hidePasswordIcon").style.visibility = "hidden";
      document.getElementById("showPasswordIcon").style.visibility = "visible";
    }
  };

  checkErrors = () => {
    const { userTempData, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(userTempData).forEach((val) => {
      if (!userTempData[val].length && val !== "postCode") {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        isError = true;
      }
    });

    this.setState((prevState) => ({
      error: { ...prevState.error, ...errorValue },
    }));

    Object.keys(error).forEach((val) => {
      if (error[val] !== undefined && error[val] !== "") {
        isError = true;
      }
    });

    return isError;
  };

  searchIfEmailExists = (email) => {
    let isEmailExist = false;
    // let myObject = this.state.userSavedData;
    let myObject = this.state.userDatabase;

    if (JSON.stringify(myObject) !== "{}") {
      Object.keys(myObject).forEach((val) => {
        let user = myObject[val];
        if (user["email"].toLowerCase() === email.toLowerCase()) {
          isEmailExist = true;
        }
      });
    }
    return isEmailExist ? " Email already used." : "";
  };

  handleButtonSignUp = (e) => {
    const { userTempData } = this.state;
    const UID = keyGenerator("UID");
    let newUserData = {};
    e.preventDefault();
    if (!this.checkErrors()) {
      this.setState((prevState) => ({
        // userSavedData
        userDatabase: {
          ...prevState.userDatabase,
          [UID]: {},
        },
      }));

      Object.keys(userTempData).forEach((val) => {
        val !== "confirmPassword" && (newUserData[val] = userTempData[val]);
      });

      this.setState((prevState) => ({
        userDatabase: {
          ...prevState.userDatabase,
          [UID]: {
            ...newUserData,
          },
        },
      }));

      this.refreshTempData();
      this.animationButton("notification")
    }
  };

  handleButtonLogIn = (e) => {
    e.preventDefault();
    const { email, password } = this.state.userTempData;
    let isLoggedIn = false;
    let myObject = this.state.userDatabase;
    if (JSON.stringify(myObject) !== "{}") {
      Object.keys(myObject).forEach((val) => {
        let user = myObject[val];
        if (
          user["email"].toLowerCase() === email.toLowerCase() &&
          user["password"] === password
        ) {
          isLoggedIn = true;
          return;
        }
      });
    }
    if (isLoggedIn === true) {
      let myProps = {};
      myProps["isLoggedIn"] = true;
      myProps["email"] = email;
      this.props.cartQty > 0 ?
      this.props.refreshScreen({...this.props.screensInitialStatus, cart: true, navBar: true, },null, myProps)
      :
      this.props.refreshScreen({...this.props.screensInitialStatus, products: true, navBar: true, categories: true},null, myProps);
    } else {
      alert("Wrong Email and/or Password");
    }
  };

  handleOptions = ({ target: { value } }) => {
    document.getElementById("password").type = "password";
    document.getElementById("hidePasswordIcon").style.visibility = "visible";
    document.getElementById("showPasswordIcon").style.visibility = "hidden";
    this.setState({ screen: value });
    this.refreshTempData();
  };

 

  handleValidations = (type, value) => {
    let errorText;

    switch (type) {
      case "email":
        errorText =
          ValidateEmail(value) +
          (this.state.screen === "signUp"
            ? this.searchIfEmailExists(value)
            : "");

        this.setState((prevState) => ({
          error: { ...prevState.error, emailError: errorText },
        }));
        break;
      case "firstName":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;
      case "lastName":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;
      case "password":
        errorText = passwordValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;
      case "confirmPassword":
        errorText = confirmPasswordValidation(
          value,
          this.state.userTempData.password
        );
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "postCode":
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      default:
        break;
    }
  };

  handleInputData = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      userTempData: {
        ...prevState.userTempData,
        [name]: value,
      },
    }));
  };

  handleBlur = ({ target: { name, value } }) => {
    this.handleValidations(name, value);
  };

  animationButton = (id) => {
    
    const notification = document.getElementById(id);
    notification.classList.add("showElement");
    setTimeout(() => {
    notification.classList.remove("showElement");
  }, 1000);
  }

  render() {
    const { error } = this.state;
    let inputData = [
      {
        label: "Email Address *",
        name: "email",
        type: "email",
        error: "emailError",
      },
      {
        id: "password",
        label: "Password *",
        name: "password",
        type: "password",
        error: "passwordError",
        label2: `Password must be 8-20 characters, 
        including: at least one capital letter, 
        at least one small letter and one special character
        -!@#$%^&*()_+`,
      },
      {
        label: "Confirm Password *",
        name: "confirmPassword",
        type: "password",
        error: "confirmPasswordError",
      },
      {
        label: "First Name *",
        name: "firstName",
        type: "text",
        error: "firstNameError",
      },
      {
        label: "Last Name *",
        name: "lastName",
        type: "text",
        error: "lastNameError",
      },
      {
        label: "Postal Code",
        name: "postCode",
        type: "text",
        error: "postCodeError",
      },
    ];

    inputData =
      this.state.screen === "signUp" ? inputData : [inputData[0], inputData[1]];

    return (
      <form className={"form"}>
        <div className={"notification"} id = "notification">
          <div style={{color: "gray", fontWeight: "600px", fontSize: "2rem"}}>
            You are registered!
          </div>
        </div>
        <div className={"leftAlign"}>
          <label className={"radio-style"}>
            <input
              type="radio"
              name="options"
              value="signUp"
             
              onChange={this.handleOptions}
            />
            Sign Up
          </label>
          <label style={{ marginLeft: "100px" }} className={"radio-style"}>
            <input
             defaultChecked
              type="radio"
              name="options"
              onChange={this.handleOptions}
              value="logIn"
            />
            Log In
          </label>
        </div>
        {inputData.length
          ? inputData.map((item) => (
              <InputBase
                key={item.name}
                placeholder={item.label}
                type={item.type}
                //value={item.name}
                onChange={this.handleInputData}
                autoComplete="off"
                name={item.name}
                myName={item.name}
                onBlur={this.handleBlur}
                errorM={
                  error && error[item.error] && error[item.error].length > 1
                    ? error[item.error]
                    : null
                }
                label={item.label}
                label2={item.label2 && item.label2}
                revealPassword={this.revealPassword}
                id={item.id && item.id}
              />
            ))
          : null}
        <div>
          <br />
          <button
            className="btn"
            onClick={
              this.state.screen === "signUp"
                ? this.handleButtonSignUp
                : this.handleButtonLogIn
            }
          >
            {this.state.screen === "signUp" ? "SAVE" : "LOG IN"}
          </button>
          <br /> <br />
          {this.state.screen === "signUp" && (
            <button
              style={{
                border: "1px solid rgb(162, 159, 159)",
                borderRadius: "5px",
                padding: "5px",
                lineHeight: "1.2",
                width: "480px",
                color: "white",
                backgroundColor: "blue",
              }}
              onClick={this.handleButton}
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </button>
          )}
        </div>
      </form>
    );
  }
}

export default LogInSignUp;
