import React from "react";


import "../../../../src/index.css"
import InputBase from "../../InputBase/InputBase";
import styles from "./LogInSignUp.module.css";
import {
  ValidateEmail,
  onlyTextValidation,
  passwordValidation,
  confirmPasswordValidation,
  postCodeValidation,
} from "../../validations";

import {
 keyGenerator
} from "../../keyGenerator";

class LogInSignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: "signUp",
      error: {},
      userTempData: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        postCode: "",
      },
      userSavedData: { noel:{email: "noel@gmail.com", password: "noelnoel"}},
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
    let myObject = this.state.userSavedData;
    if (JSON.stringify(myObject) !== "{}") {
      Object.keys(myObject).forEach((val) => {
        let user = myObject[val];
        if (user["email"] === email) {
          isEmailExist = true;
        }
      });
    }
    return isEmailExist ? " Email already used." : "";
  };

  handleButtonSignUp = (e) => {
    const { userTempData } = this.state;
    const UID = keyGenerator("UID");
    e.preventDefault();
    if (!this.checkErrors()) {
      this.setState((prevState) => ({
        userSavedData: {
          ...prevState.userSavedData,
          [UID]: {},
        },
      }));

      Object.keys(userTempData).forEach((val) => {
        this.setState((prevState) => ({
          userSavedData: {
            ...prevState.userSavedData,
            [UID]: {
              ...prevState.userSavedData[UID],
              [val]: userTempData[val],
            },
          },
        }));

        this.refreshTempData();
      });
    }
  };

  handleButtonLogIn = (e) => {
    e.preventDefault();
    const { email, password } = this.state.userTempData;
    //const { userTempData } = this.state;
    let isLoggedIn = false;
    let myObject = this.state.userSavedData;
    if (JSON.stringify(myObject) !== "{}") {
      Object.keys(myObject).forEach((val) => {
        let user = myObject[val];
        if (user["email"] === email && user["password"] === password) {
          isLoggedIn = true;
          //alert ('Logged In');
          return;
        }
      });
    }
    isLoggedIn === true ? this.props.refreshScreen("logInSignUp", "cart", this.props.cart) : alert("wrong")
   
  };

  handleOptions = ({ target: { value } }) => {
    this.setState({ screen: value });
    this.refreshTempData();
    this.checkErrors();
    
  };

  makeLabel = (lbl) => {
    return <label className={styles.label}>{lbl}</label>;
  };

  handleValidations = (type, value) => {
    let errorText;

    switch (type) {
      case "email":
        errorText = ValidateEmail(value) + 
        (this.state.screen === "signUp" ? this.searchIfEmailExists(value) : "");

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
        errorText = postCodeValidation(value);
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
    this.checkErrors();
  };

  componentDidMount() {
    this.checkErrors();
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
      this.state.screen === "signUp"
        ? inputData
        : [
           inputData[0],
           inputData[1]
          ];
          

    return (
      <form className={styles.form}>
        <div></div>
        <div className={styles.leftAlign}>
          <label className={styles.label}>
            <input
              type="radio"
              name="options"
              value="signUp"
              defaultChecked
              onChange={this.handleOptions}
            />
            Sign Up
          </label>
          <label style={{ marginLeft: "100px" }} className={styles.label}>
            <input
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
                padding: "10px",
                lineHeight: "1.2",
                width: "480px",
                color: "white",
                backgroundColor: "blue",
              }}
              onClick={this.handleButton}
            >
              SIGN UP WITH FACEBOOK
            </button>
          )}
        </div>
      </form>
    );
  }

  
}

export default LogInSignUp;
