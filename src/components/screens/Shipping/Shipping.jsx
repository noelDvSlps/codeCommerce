import React from "react";
import "./Shipping.css";
import InputBase from "../../InputBase/InputBase";
import Progress from "../../Progress/Progress";
import Summary from "../../Summary";
import {
  onlyTextValidation,
  onlyNumberValidation,
  alphaNumericValidation,
} from "../../validations";

const inputData = [
  {
    label: "Address Title",
    name: "addressTitle",
    type: "text",
    error: "addressTitleError",
  },
  {
    label: "Name-Surname",
    name: "nameSurname",
    type: "text",
    error: "nameSurnameError",
  },
  {
    label: "Address",
    name: "address",
    type: "address",
    error: "addressError",
  },
];

const shippingData = [
  {
    type: "STANDARD",
    value: "0.00",
    description: "Delivery in 4 - 6 business days",
    description2: "- Free",
  },
  {
    type: "EXPRESS",
    value: "5.00",
    description: "Delivery in 1 - 3 business days",
    description2: "- $5.00",
  },
];

const countries = [
  { value: "USA", name: "United States" },
  { value: "PH", name: "Philippines" },
];

const cities = [
  { value: "Daly City", name: "Daly City" },
  { value: "Antioch", name: "Antioch" },
];

const states = [
  { value: "CA", name: "California" },
  { value: "TX", name: "Texas" },
];

const phones = [
  [
    {
      label: "Cellphone",
      left: null,
      placeholder: "Area Code",
      width: "90px",
      inputLeft: "100px",
      name: "cellAreaCode",
      errName: "cellAreaCodeError",
    },
    {
      label: null,
      left: "110px",
      placeholder: "Cell Numbers",
      width: "150px",
      inputLeft: null,
      name: "cellNumbers",
      errName: "cellNumbersError",
    },
  ],
  [
    {
      label: "Telephone",
      left: null,
      width: "90px",
      inputLeft: "100px",
      name: "telAreaCode",
      placeholder: "Area Code",
      errName: "telAreaCodeError",
    },
    {
      width: "150px",
      left: "110px",
      label: null,
      name: "telNumbers",
      placeholder: "Telephone Numbers",
      errName: "telNumbersError",
    },
  ],
];

class Shipping extends React.Component {
  constructor(props) {
    super();
    this.state = {
      cart: props.cart,
      error: {},
      shippingTempData: {
        ...props.shippingData,
        country: countries[0].value,
        city: cities[0].value,
        state: states[0].value,
        shipmentMethod: shippingData[0].type,
        shipmentMethodDesc: shippingData[0].description,
      },
    };
  }
  handleButtonCheckOut = (e) => {
    e.preventDefault();
    let myProps = {};
    myProps["cart"] = this.state.cart;
    myProps["shippingData"] = this.state.shippingTempData;
    const isError = this.checkErrors();
    !isError &&
      this.props.refreshScreen(
        { ...this.props.screensInitialStatus, navBar: true, payment: true },
        this.state.cart,
        { shippingData: this.state.shippingTempData }
      );
  };

  checkErrors = () => {
    const { shippingTempData, error } = this.state;
    let errorValue = {};
    let isError = false;

    Object.keys(shippingTempData).forEach((val) => {
      if (!shippingTempData[val].length) {
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

  handleBlur = ({ target: { name, value } }) => {
    this.handleValidations(name, value);
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "addressTitle":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "nameSurname":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "address":
        errorText = alphaNumericValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;
      case "zipCode":
        errorText = onlyNumberValidation(value);
        errorText = (errorText === undefined ? "" : errorText)
        value.length !== 5 && (errorText = errorText + " Must be 5 digits")
         this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "cellAreaCode":
        
        errorText = onlyNumberValidation(value);
        errorText = (errorText === undefined ? "" : errorText)
        value.length !== 3  && (errorText = errorText + " Must be 3 digits")
        
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "cellNumbers":
        errorText = onlyNumberValidation(value);
        errorText = (errorText === undefined ? "" : errorText)
        value.length !== 7  && (errorText = errorText + " Must be 7 digits")
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "telAreaCode":
        errorText = onlyNumberValidation(value);
        errorText = (errorText === undefined ? "" : errorText)
        value.length !== 3  && (errorText = errorText + " Must be 3 digits!")
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "telNumbers":
        errorText = onlyNumberValidation(value);
        errorText = (errorText === undefined ? "" : errorText)
        value.length !== 7  && (errorText = errorText + " Must be 7 digits")
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      default:
        break;
    }
  };

  formatTwoDecimals = (amount) => {
    return (Math.round(Number(amount) * 100) / 100).toFixed(2);
  };

  getTotal = (value) => {
    const discount = this.state.cart["discount"]
      ? this.state.cart["discount"]
      : 0;

    return (
      Number(this.state.cart["cartSubtotal"]) - Number(discount) + Number(value)
    );
  };

  handleTotalPrice = (value) => {
    const subTotal = this.state.cart["cartSubtotal"];
    const total = this.formatTwoDecimals(this.getTotal(value));
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        cartSubtotal: subTotal,
        cartTotal: total,
      },
    }));
  };

  componentDidMount() {
    setTimeout(() => {
      this.handleTotalPrice(0);
    });
  }
  handleInputData = (e) => {
    const form = document.getElementById("shippingForm");
    const radioButton = form.elements["shipping"];
    const text = document.getElementsByName("shippingDesc");
    let index = radioButton[0].checked ? 0 : 1;

    let shipmentMethod = Number(e.target.value) === 0 ? "STANDARD" : "EXPRESS";
    e.target.name === "shipping"
      ? this.setState(
          (prevState) => ({
            cart: {
              ...prevState.cart,
              [e.target.name]: e.target.value,
            },

            shippingTempData: {
              ...prevState.shippingTempData,
              shipmentMethod: shipmentMethod,
              shipmentMethodDesc: text[index].textContent,
            },
          }),
          this.handleTotalPrice(e.target.value)
        )
      : this.setState((prevState) => ({
          shippingTempData: {
            ...prevState.shippingTempData,
            [e.target.name]: e.target.value,
          },
        }));
  };

  refreshTempData = () => {
    this.setState({
      error: {},
      shippingTempData: {
        addressTitle: "",
      },
    });
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  handleBackToCart = (e) => {
    e.preventDefault();
    this.props.refreshScreen({
      ...this.props.screensInitialStatus,
      cart: true,
      navBar: true,
    });
  };

  render() {
    const { error } = this.state;
    const cart = this.state.cart["orders"];
    const { cartSubtotal, shipping, discount, cartTotal } = this.state.cart;

    return (
      <div className="shippingWrapper">
        <form id="shippingForm" className="shippingForm">
          <div className="shipping-info">
            <div className="progress">
              <Progress processNumber={2} />
            </div>

            <div
              className="shipping-info-wrapper"
              style={{ textAlign: "left" }}
            >
              {inputData.length
                ? inputData.map((item) => (
                    <InputBase
                      value={this.state.shippingTempData[item.name]}
                      width="80%"
                      gap="40px"
                      key={item.name}
                      placeholder={item.label}
                      type={item.type}
                      onChange={this.handleInputData}
                      autoComplete="off"
                      name={item.name}
                      onBlur={this.handleBlur}
                      errorM={
                        error &&
                        error[item.error] &&
                        error[item.error].length > 1
                          ? error[item.error]
                          : null
                      }
                      label={item.label}
                      id={item.id && item.id}
                      style={{ position: "absolute" }}
                      inputLeft="100px"
                      spanTop="-20px"
                    />
                  ))
                : null}

              <div
                className="more-address-info-wrapper"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <InputBase
                  placeholder="Zip Code"
                  type="text"
                  display="inline"
                  width="100px"
                  label="zip"
                  gap="40px"
                  onChange={this.handleInputData}
                  autoComplete="off"
                  name="zipCode"
                  value={this.state.shippingTempData["zipCode"]}
                  spanTop="-20px"
                  onBlur={this.handleBlur}
                  errorM={
                    error &&
                    error["zipCodeError"] &&
                    error["zipCodeError"].length > 1
                      ? error["zipCodeError"]
                      : null
                  }
                  style={{ position: "absolute" }}
                  inputLeft="100px"
                />

                <div style={{ marginLeft: "75px", marginTop: "-12px" }}>
                  <div style={{ marginLeft: "50px", fontSize: "12px" }}>
                    Country
                  </div>
                  <select
                    value={this.state.shippingTempData.country}
                    onChange={this.handleInputData}
                    type="country"
                    id="country"
                    name="country"
                    style={{ marginLeft: "50px", width: "120px" }}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country.value}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginLeft: "0px", marginTop: "-12px" }}>
                  <div style={{ marginLeft: "25px", fontSize: "12px" }}>
                    City
                  </div>
                  <select
                    value={this.state.shippingTempData["city"]}
                    type="city"
                    name="city"
                    id="city"
                    onChange={this.handleInputData}
                    style={{ width: "120px" }}
                  >
                    {cities.map((city, index) => (
                      <option key={index} value={city.value}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginLeft: "0px", marginTop: "-12px" }}>
                  <div style={{ marginLeft: "25px", fontSize: "12px" }}>
                    State
                  </div>
                  <select
                    value={this.state.shippingTempData["state"]}
                    type="state"
                    name="state"
                    id="state"
                    onChange={this.handleInputData}
                  >
                    {states.map((state, index) => (
                      <option key={index} value={state.value}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {phones.map((phone, index) => (
                <div key={index} className="phone-numbers">
                  {phone.map((item, index) => (
                    <InputBase
                      key={index}
                      left={item.left}
                      label={item.label}
                      inputLeft={item.inputLeft}
                      value={this.state.shippingTempData[item.name]}
                      placeholder={item.placeholder}
                      width={item.width}
                      name={item.name}
                      errorM={
                        error &&
                        error[item.errName] &&
                        error[item.errName].length > 1
                          ? error[item.errName]
                          : null
                      }
                      display="inline"
                      style={{ position: "absolute" }}
                      gap="30px"
                      onChange={this.handleInputData}
                      autoComplete="off"
                      spanTop="-20px"
                      onBlur={this.handleBlur}
                    />
                  ))}
                </div>
              ))}

              <hr />
              <div className="options-wrapper" style={{ textAlign: "left" }}>
                {shippingData.length
                  ? shippingData.map((item, index) => (
                      <label key={index}>
                        <input
                          type="radio"
                          name="shipping"
                          onChange={this.handleInputData}
                          checked={
                            this.state.shippingTempData["shipmentMethod"] ===
                            item.type
                              ? true
                              : false
                          }
                          value={item.value}
                        />
                        <strong>{item.type} </strong>
                        <span name="shippingDesc">{item.description}</span>
                        <span>{item.description2}</span>
                      </label>
                    ))
                  : null}
              </div>
              <div className="shipment-address"></div>

              <div style={{ width: "200px" }}>
                <button
                  onClick={this.handleBackToCart}
                  style={{ backgroundColor: "white", color: "black" }}
                  className="btn"
                >
                  BACK TO CART
                </button>{" "}
              </div>
            </div>
          </div>

          <div className="summary">
            <Summary
              screens={this.props.screens}
              cart={cart}
              cartSubtotal={cartSubtotal}
              shipping={shipping}
              discount={discount}
              cartTotal={cartTotal}
              handleDiscount={this.handleDiscount}
            />

            <button
              onClick={this.handleButtonCheckOut}
              className="btn"
              style={{ marginTop: "200px" }}
            >
              PAYMENT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Shipping;
