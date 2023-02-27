import React from "react";
import { keyGenerator } from "../../keyGenerator";
import "./Shipping.css";
import InputBase from "../../InputBase/InputBase";
import Progress from "../../Progress/Progress";
import { onlyTextValidation, onlyNumberValidation, alphaNumericValidation } from "../../validations";

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
  constructor(props) {
    super();
    this.state = {
      cart: props.cart,
      error: {},
      shippingTempData: props.shippingData,
    };
  }
  handleButtonCheckOut = (e) => {
    e.preventDefault();
    let myProps = {};
    myProps["cart"] = this.state.cart;
    myProps["shippingData"] = this.state.shippingTempData;
    const isError = this.checkErrors();
    !isError
      && this.props.refreshScreen("shipping", "payment", myProps)
      
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
    //this.checkErrors();
  };

  handleValidations = (type, value) => {
    let errorText;
    console.log(type, value);
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
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "cellAreaCode":
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "cellNumbers":
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "telAreaCode":
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, [`${type}Error`]: errorText },
        }));
        break;

      case "telNumbers":
        errorText = onlyNumberValidation(value);
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
    const text = document.getElementsByName("shippingDesc")
    let index = radioButton[0].checked ? 0 : 1
    
   
    let shipmentMethod = Number(e.target.value) === 0 ? "STANDARD" : "EXPRESS";
    e.target.name === "shipping"
    
      ? 
     
      
      
      
      this.setState(
          (prevState) => ({
            cart: {
              ...prevState.cart,
              [e.target.name]: e.target.value,
            },

            shippingTempData: {
              ...prevState.shippingTempData,
              shipmentMethod: shipmentMethod,
              shipmentMethodDesc: text[index].textContent
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

  handleTest = (e) => {
    var form = document.getElementById("shippingForm");
    var options = form.elements["shipping"];
    var text = document.getElementsByName("shippingDesc")

   
    alert(text[0].textContent);
    
   
    alert (options[0].checked)
  }

  handleBackToCart = (e) => {
    e.preventDefault();
    this.props.refreshScreen("shipping", "cart", null);
  };

  render() {
    const { error } = this.state;
    const cart = this.state.cart["orders"];
    const orders = Object.keys(cart);
    const {cartSubtotal, shipping, discount, cartTotal} = this.state.cart
    let cartData = [
      { label: "Cart Subtotal", value: "$" + cartSubtotal },
      {label: "Shipping and Handling", value: shipping > 0 ? "+ $" + shipping : "-"},
      { label: "Discount", value: discount > 0 ? "- $" + discount : "-" },
      { label: "Cart Total", value: "$" + cartTotal },
    ];
    return (
      <div className="shippingWrapper">
        <form id= "shippingForm" className="shippingForm">
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
                      value = {this.state.shippingTempData[item.name]}
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
                  value={this.state.shippingTempData["country"]}
                    onChange={this.handleInputData}
                    type="country"
                    id="country"
                    name="country"
                    style={{ marginLeft: "50px", width: "120px" }}
                  >
                    <option value="PH" selected>
                      Philippines
                    </option>
                    <option value="US" selected>
                      United States
                    </option>
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
                    <option value="SF">San Francisco</option>
                    <option value="DC">Daly City</option>
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
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  justifyContent: "left",
                }}
              >
                <InputBase
                value={this.state.shippingTempData["cellAreaCode"]}
                  placeholder="Area Code"
                  errorMsgLeft="100px"
                  display="inline"
                  width="90px"
                  label="Cellphone"
                  style={{ position: "absolute" }}
                  gap="30px"
                  inputLeft="100px"
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
                  placeholder="Cell Numbers"
                  // errorMsgLeft="110px"
                  display="inline"
                  width="150px"
                  style={{ position: "absolute" }}
                  gap="30px"
                  left="110px"
                  onChange={this.handleInputData}
                  autoComplete="off"
                  value={this.state.shippingTempData["cellNumbers"]}
                  name="cellNumbers"
                  spanTop="-20px"
                  onBlur={this.handleBlur}
                  errorM={
                    error &&
                    error["cellNumbersError"] &&
                    error["cellNumbersError"].length > 1
                      ? error["cellNumbersError"]
                      : null
                  }
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  justifyContent: "left",
                }}
              >
                <InputBase
                  placeholder="Area Code"
                  errorMsgLeft="100px"
                  label="Telephone"
                  display="inline"
                  width="90px"
                  style={{ position: "absolute" }}
                  gap="30px"
                  inputLeft="100px"
                  onChange={this.handleInputData}
                  autoComplete="off"
                  value={this.state.shippingTempData["telAreaCode"]}
                  name="telAreaCode"
                  spanTop="-20px"
                  onBlur={this.handleBlur}
                  errorM={
                    error &&
                    error["telAreaCodeError"] &&
                    error["telAreaCodeError"].length > 1
                      ? error["telAreaCodeError"]
                      : null
                  }
                />

                <InputBase
                  placeholder="Telephone Numbers"
                  errorMsgLeft="110px"
                  display="inline"
                  width="150px"
                  style={{ position: "absolute" }}
                  gap="30px"
                  left="110px"
                  onChange={this.handleInputData}
                  autoComplete="off"
                  value={this.state.shippingTempData["telNumbers"]}
                  name="telNumbers"
                  spanTop="-20px"
                  onBlur={this.handleBlur}
                  errorM={
                    error &&
                    error["telNumbersError"] &&
                    error["telNumbersError"].length > 1
                      ? error["telNumbersError"]
                      : null
                  }
                />
              </div>

              <hr />
              <div className="options-wrapper" style={{ textAlign: "left" }}>
                <label>
                  <input
                  key={0}
                    type="radio"
                    name="shipping"
                    value="0.00"
                    checked = {this.state.shippingTempData["shipmentMethod"] === "STANDARD" ? true : false}
                    onChange={this.handleInputData}
                    
                  />
                  <strong>STANDARD </strong> <span name = "shippingDesc">Delivery in 4 - 6 business days
                  </span><span> - Free</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="shipping"
                    onChange={this.handleInputData}
                    checked = {this.state.shippingTempData["shipmentMethod"] === "EXPRESS" ? true : false}
                    value="5.00"
                  />
                  <strong>EXPRESS </strong> <span name = "shippingDesc">Delivery in 1 - 3 business days </span> <span>- $
                  5.00</span>
                </label>
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
            <div className="shipping-summary-wrapper">
              <table>
                <tbody>
                  {orders.map((order) => (
                    <tr style={{ display: "flex", alignItems: "center" }}>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <div className="img-wrapper">
                          <img
                            src={require("../../assets/" +
                              cart[order]["product"]["image"])}
                            alt=""
                          />
                        </div>
                      </td>

                      <td>
                        <div>
                          <strong>{cart[order]["product"]["name"]}</strong>
                        </div>
                        <div>QTY: {Number(cart[order]["quantity"])}</div>
                      </td>

                      <td>
                        <div>
                          {"$" +
                            this.formatTwoDecimals(
                              Number(cart[order]["total"])
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr />
            {cartData.length
              ? cartData.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <div>{item.label}</div>
                    <div>
                      {item.value === undefined || item.value === null
                        ? "-"
                        : item.value}
                    </div>
                  </div>
                ))
              : null}

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
