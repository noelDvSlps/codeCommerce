import React from "react";
import { keyGenerator } from "../../keyGenerator";
import "./Shipping.css";
import InputBase from "../../InputBase/InputBase";
import Progress from "../../Progress/Progress";
import { onlyTextValidation, postCodeValidation } from "../../validations";

let inputData = [
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

class Shipping extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      error: {},
      userTempData: {
        addressTitle: "",
      },
      userSavedData: {},
    };
  }
  handleBlur = ({ target: { name, value } }) => {
    this.handleValidations(name, value);
    this.checkErrors();
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
      case "zipCode":
        errorText = postCodeValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      // case "postCode":
      //   errorText = onlyTextValidation(value);
      //   this.setState((prevState) => ({
      //     error: { ...prevState.error, [`${type}Error`]: errorText },
      //   }));
      //   break;

      default:
        break;
    }
  };

  checkErrors = () => {
    const { userTempData, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(userTempData).forEach((val) => {
      if (!userTempData[val].length) {
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

  formatTwoDecimals = (amount) => {
    return (Math.round(Number(amount) * 100) / 100).toFixed(2);
  };

  getTotal = (shipping) => {
    const cartSubtotal = this.props.cart["cartSubtotal"];
    const cartTotal = Number(cartSubtotal) + Number(shipping);
    console.log(shipping);
    return this.formatTwoDecimals(cartTotal);
  };

  handleTotalPrice = (value) => {
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        cartTotal: this.getTotal(value),
      },
    }));
  };

  componentDidMount() {
    setTimeout(() => {
      this.handleTotalPrice(0);
    });
  }

  handleInputData = ({ target: { name, value } }) => {
    name === "shipping"
      ? this.setState((prevState) => ({
          cart: {
            ...prevState.cart,
            [name]: value,
          },
        }))
      : this.setState((prevState) => ({
          userTempData: {
            ...prevState.userTempData,
            [name]: value,
          },
        }));
    name === "shipping" && this.handleTotalPrice(value);
  };

  refreshTempData = () => {
    this.setState({
      error: {},
      userTempData: {
        addressTitle: "",
      },
    });
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  handleBackToCart = (e) => {
    e.preventDefault();
    this.props.refreshScreen("shipping", "cart", this.props.cart);
  };

  render() {
    const { error } = this.state;

    const cart = this.props.cart["orders"];
    const orders = Object.keys(cart);
    // return (
    //   <div>sh</div>
    // )
    return (
      <div className="shippingWrapper">
        <form className="shippingForm">
          <div className="shipping-info">
            <div className="progress">
              <Progress />
            </div>

            <div
              className="shipping-info-wrapper"
              style={{ textAlign: "left" }}
            >
              {inputData.length
                ? inputData.map((item) => (
                    <InputBase
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
                      left="100px"
                      spanTop="-20px"
                    />
                  ))
                : null}

              <div className="more-address-info-wrapper" style={{position: "relative", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <InputBase
                type="text"
                display="inline"
                width="100px"
                label="zip"
                gap="40px"
                onChange={this.handleInputData}
                autoComplete="off"
                name="zipCode"
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
                left="100px"
              />

              <select id="country" name="country" style={{marginLeft: "200px"}}>
                <option value="PH" selected>
                  Philippines
                </option>
                <option value="US" selected>
                  United States
                </option>
               
              
              </select>

              <select name="city" id="city">
                <option value="SF">San Francisco</option>
                <option value="DC">Daly City</option>
              </select>

              <select name="state" id="state">
                <option value="CA">California</option>
                <option value="TX">Texas</option>
              </select>

              </div>

              <div style= {{display: "grid", gridAutoFlow: "column", justifyContent: "left"}}>
              <InputBase
                display="inline"
                width="50px"
                label="Cellphone"
                style={{ position: "absolute" }}
                gap="30px"
                left = "100px"

                onChange={this.handleInputData}
                autoComplete="off"
                name="cellAreaCode"
                spanTop="-20px"
                onBlur={this.handleBlur}
                errorM={
                  error &&
                  error["cellAreaCodeError"] &&
                  error["cellAreaCodeError"].length > 1
                    ? error["cellAreaCodeError"]
                    : null
                }
              />

              <InputBase
                display="inline"
                width="100px"
                style={{ position: "absolute" }}
                gap="30px"
                left = "110px"
              />

              </div>

              <div style= {{display: "grid", gridAutoFlow: "column", justifyContent: "left"}}>
              <InputBase
                display="inline"
                width="50px"
                label="Cellphone"
                style={{ position: "absolute" }}
                gap="30px"
                left = "100px"
              />

              <InputBase
                display="inline"
                width="100px"
                style={{ position: "absolute" }}
                gap="30px"
                left = "110px"
              />

              </div>

             

             
              <hr />
              <div className="options-wrapper" style={{ textAlign: "left" }}>
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    value="0.00"
                    defaultChecked
                    onChange={this.handleInputData}
                  />
                  <strong>STANDARD </strong> Delivery in 4 - 6 business days -
                  Free
                </label>
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    onChange={this.handleInputData}
                    value="5.00"
                  />
                  <strong>EXPRESS </strong> Delivery in 1 - 3 business days - $
                  5.00
                </label>
              </div>

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
            {orders.map((order) => (
              <div key={order} className="shipping-summary-wrapper">
                {Object.keys(cart[order]).map((val) => (
                  <div key={keyGenerator(order + val)}>
                    {val === "product" && (
                      <div>
                        <img
                          className="shipping-image"
                          src={require("../../assets/" +
                            cart[order][val]["image"])}
                          alt=""
                        />
                        <div style={{ textAlign: "left", paddingLeft: "60px" }}>
                          <strong>{cart[order][val]["name"]}</strong>{" "}
                        </div>
                      </div>
                    )}

                    {val === "quantity" && (
                      <div style={{ textAlign: "left", paddingLeft: "60px" }}>
                        Qty: {cart[order][val]}
                      </div>
                    )}

                    {val === "total" && (
                      <div className="individual-total">
                        <strong>$ {cart[order][val]}</strong>{" "}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <br />
            <br />
            <div
              className="payment-breakdown"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <span style={{ textAlign: "left" }}>Sub Total</span>
              <div>{this.props.cart["cartSubtotal"]}</div>
            </div>

            <div
              className="payment-breakdown"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <span style={{ textAlign: "left" }}>Shipping</span>
              <div>
                {this.state.cart["shipping"]
                  ? this.state.cart["shipping"]
                  : "-"}
              </div>
            </div>

            <div
              className="payment-breakdown"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <span style={{ textAlign: "left" }}>
                <strong>Cart Total</strong>
              </span>
              <div>
                <strong> {this.state.cart["cartTotal"]} </strong>{" "}
              </div>
            </div>

            <button className="btn" style={{ marginTop: "200px" }}>
              PAYMENT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Shipping;
