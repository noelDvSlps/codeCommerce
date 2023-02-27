import React from "react";
import Progress from "../../Progress/Progress";
import { keyGenerator } from "../../keyGenerator";
import "./Payment.css";
import CardExpiration from "./CardExpiration";
import InputBase from "../../InputBase/InputBase";
import { OTHERCARDS } from "../../constants";
import {
  cardExpireValidation,
  cardNumberValidation,
  onlyNumberValidation,
  onlyTextValidation,
  securityCodeValidation,
} from "../../validations";


const INIT_CARD = {
  card: "",
  cardHolder: "",
  expiry: "",
  securityCode: "",
};
let inputData = [
  {
    label: "Cardholder Name",
    name: "cardHolder",
    type: "text",
    error: "cardHolderError",
  },
  {
    label: "Card Number",
    name: "card",
    type: "text",
    error: "cardError",
  },
  // {
  //   label: "Expiry date (MM/YY)",
  //   name: "expiry",
  //   type: "text",
  //   error: "expiryError",
  // },
  {
    label: "Security Code",
    name: "securityCode",
    type: "text",
    error: "securityCodeError",
  },
];
class Payment extends React.Component {
  constructor(props) {
    super();
    this.state = {
      error: {},
      // userTempData:props.userTempData,
      card: {
        cardData: INIT_CARD,
        maxLength: OTHERCARDS.length,
        error: {},
        cardType: null,
      },
      isError: true,
    };
  }
  formatTwoDecimals = (amount) => {
    return (Math.round(Number(amount) * 100) / 100).toFixed(2);
  };

  

  checkErrors = () => {
    const { error } = this.state;
    const cardData = this.state.card["cardData"];
    let errorValue = {};
    let isError = false;

    Object.keys(cardData).forEach((val) => {
      if (val !== "cardType") {
        if (!cardData[val].length || cardData[val] === undefined)  {
        
          errorValue = { ...errorValue, [`${val}Error`]: "Required" };
          isError = true;
        }

      } 
      
    });
    
    isError = ((Object.keys(errorValue).length === 0) ? false : true)
    
    errorValue = {...error,...errorValue }
    Object.keys(errorValue).forEach((val) => {
      if (errorValue[val] !== undefined && errorValue[val] !== "") {
        isError = true;
      }
    });

    this.setState((prevState) => ({
      error: { ...prevState.error, ...errorValue },
      isError: isError
    })); 
    return isError;
  };

  handleButtonCheckOut = (e) => {
    e.preventDefault();
    let myprops = {};
    myprops["card"] = this.state.card;

    const isError = this.checkErrors();
    !isError
      && this.props.refreshScreen("payment", "confirmation", myprops)
      ;
  };

  handleBackToAddress = (e) => {
    e.preventDefault();
    let myProps = {};
    myProps["shippingData"] = this.props.shippingData;

    this.props.refreshScreen("payment", "shipping", myProps);
  };

  

  handleBlur = ({ target: { name, value } }) =>
    {
      
    this.handleValidations(name, value);
   
    
  }

  
  findDebitCardType = (cardNumber) => {
      const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
    return "";
  };

  handleValidations = ((type, value) => {
    let errorText;
    
   
  //  this.setState(()=>({isError: false}))
    switch (type) {
      case "card":
        errorText = cardNumberValidation(value);
        
        //find card type
        this.setState((prevState) => ({
          card: {
            cardData: {
              ...prevState.card["cardData"],
              cardType: this.findDebitCardType(value),
            },
          },
          error: { ...prevState.error, cardError: errorText },
          
        }));

        //setState cardType, error
        break;
      case "cardHolder":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, cardHolderError: errorText },
          
        }));
        //checks for spaces and numbers
        //setState error
        break;
      // case "expiry":
        
      //   errorText = cardExpireValidation(value);
      //   this.setState((prevState) => ({
      //     error: { ...prevState.error, expiryError: errorText },
        
      //   }));
      //   //check date format
      //   //setState error
      //   break;
      case "securityCode":
        errorText = securityCodeValidation(3, value, onlyNumberValidation);
        this.setState((prevState) => ({
          error: { ...prevState.error, securityCodeError: errorText },
         
        }));
        break;
        case ("month"):
          value = document.getElementById("month").value + "/"  + document.getElementById("year").value
          errorText = cardExpireValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, expiryError: errorText },
         
        }));
          break;
        case ("year"):
          value = document.getElementById("month").value + "/"  + document.getElementById("year").value
          errorText = cardExpireValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, expiryError: errorText },
         
        }));
          break;
      default:
        break;
        
        
      //
    }
   
    if (errorText && errorText !== undefined && errorText.length > 0) {
      this.setState(()=>({
        isError: true
      }))
    }
    
    
  });
  handleInputData = ({ target: { name, value} }) => {
    this.handleValidations(name, value);
    if (name === "card") {
      let mask = value.split(" ").join("");

      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        this.setState((prevState) => ({
          card: {
            cardData: {
              ...prevState.card["cardData"],
              [name]: mask,
            },
          },
        }), this.checkErrors);
      } else {
        this.setState((prevState) => ({
          card: {
            cardData: {
              ...prevState.card["cardData"],
              [name]: "",
            },
          },
        }), this.checkErrors);
      }
    } else if (name === "month" || name === "year") { 
      value = document.getElementById("month").value + "/" + document.getElementById("year").value
      this.setState((prevState) => ({
        card: {
          cardData: {
            ...prevState.card["cardData"],
            ["expiry"]: value,
          },
        },
      }), this.checkErrors);
      

    } else {
      this.setState(
        (prevState) => ({
        card: {
          cardData: {
            ...prevState.card["cardData"],
            [name]: value,
          },
        },
      }), this.checkErrors);
    }
    
   
  };

  render() {
    const { error } = this.state;
    const cart = this.props.cart["orders"];
    const orders = Object.keys(cart);
    const { cardData, cardType, maxLength } = this.state.card;
    let cartData = [
      { label: "Cart Subtotal", value: this.props.cart["cartSubtotal"] },
      {
        label: "Shipping and Handling",
        value: this.props.cart["shipping"],
      },
      { label: "Discount", value: this.props.cart["discount"] },
      { label: "Cart Total", value: this.props.cart["cartTotal"] },
    ];
    return (
      <div className="paymentWrapper">
        <form className="paymentForm">
          <div className="payment-info">
            <div className="progress">
              <Progress processNumber={3} />
            </div>
            <div className="payment-info-wrapper">
              {inputData.length
                ? inputData.map((item) => (
                    <InputBase
                      cardType={cardData["cardType"]}
                      isCard={item.name === 'card'}
                      error = {error}
                      value={cardData && cardData[item.name]}
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
                
                <CardExpiration 
                onChange = {this.handleInputData}
                onBlur={this.handleBlur}
                errorM={
                  error &&
                  error["expiryError"] &&
                  error["expiryError"].length > 1
                    ? error["expiryError"]
                    : null
                }
                />
                
              <button
                onClick={this.handleBackToAddress}
                className="btn"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  width: "150px",
                  marginTop: "100px"
                }}
              >
                BACK TO ADDRESS
              </button>
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

            <br />
            <br />

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
            

           
            

           

            <div name="shipmentAddress">
              <hr />
              <div>
                <strong>SHIPMENT ADDRESS</strong>
              </div>
              <div>{this.props.shippingData["address"]}</div>
              <div>
                {this.props.shippingData["city"]},{" "}
                {this.props.shippingData["state"]}
              </div>
              <div>
                {this.props.shippingData["country"]},{" "}
                {this.props.shippingData["zipCode"]}
              </div>
              <div>E-mail: {this.props.email}</div>
            </div>
            <div name="shipmentMethod">
              <hr />
              <div>
                <strong>SHIPMENT METHOD</strong>
              </div>
              <div>{this.props.shippingData["shipmentMethod"]}</div>
              <div>{this.props.shippingData["shipmentMethodDesc"]}</div>
            </div>

            <button
             
              onClick={this.handleButtonCheckOut}
              className=  {this.state.isError ? "btn btn-disabled" : "btn"}
              style={{ marginTop: "20px",  }}
            >
              PAY {this.props.cart["cartTotal"]}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Payment;
