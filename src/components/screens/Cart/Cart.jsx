import React from "react";
import "./Cart.css";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { keyGenerator } from "../../keyGenerator";

class Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      cart: props.cart,
    };
  }

  delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  formatTwoDecimals = (amount) => {
    return (Math.round(Number(amount) * 100) / 100).toFixed(2);
  };

  handleDiscount = (e) => {
    e.preventDefault();
    this.setState(
      (prevState) => ({
        cart: { ...prevState.cart, discount: "4.50" },
      }),
      this.handleTotalPrice
    );
  };

  handleInputData = ({ target: { name, id } }) => {
   
    const value = document.getElementById(id).value;
    
    const tempCart = this.state.cart["orders"];
    const tempObj = tempCart[name];
    tempObj["quantity"] = Number(value);
    const newPrice = this.formatTwoDecimals(Number(value) * tempObj["price"]);
    tempObj["total"] = newPrice;
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        orders: {
          ...prevState.cart["orders"],
          [name]: tempObj,
        },
      },
    }));
    this.handleTotalPrice();
  };

  handleTotalPrice = () => {
    const subTotal = this.getSubtotal();
    const total = this.formatTwoDecimals(this.getTotal(subTotal));
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        cartSubtotal:  subTotal,
        cartTotal: total,
      },
    }));
  };

  getSubtotal = () => {
    const cart = this.state.cart["orders"];
    const orders = Object.keys(cart);
   
    let tempPrice = 0;
    orders.map((order) => {
      Object.keys(cart[order]).map((val) => {
        if (val === "total") {
          tempPrice += Number(cart[order][val]);
        }
      });
    });
    return this.formatTwoDecimals(tempPrice);
  };

  getTotal = (subTotal) => {
    const discount = this.state.cart["discount"]
      ? this.state.cart["discount"]
      : 0;
    const shipping = this.state.cart["shipping"]
      ? this.state.cart["shipping"]
      : 0;
    return Number(subTotal) - Number(discount) + Number(shipping);
  };

  handleClose = (e) => {
    let elName = e.currentTarget.attributes.getNamedItem("name").value;
    const myObj = this.state.cart["orders"];
    const updatedCart = Object.keys(myObj)
      .filter((key) => key !== elName)
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.state.cart["orders"][key],
        });
      }, {});
    this.setState(
      (prevState) => ({
        cart: { ...prevState.cart, orders: updatedCart },
      }),
      this.handleTotalPrice
    );
  };

  handleButton = (e) => {
    e.preventDefault();
    let myProps = {};
    myProps["cart"] = this.state.cart;
    myProps["cart"]["cartSubtotal"] = this.state.cart["cartSubtotal"];

    this.props.refreshScreen("cart", "shipping", myProps);
  };

  componentDidMount() {
    setTimeout(() => {
      this.handleTotalPrice();
    });
  }

  render() {
    const items = [];
    for (let i = 1; i <= 5; i++) {
      items.push(i);
    }

    const headers = [
      ["PRODUCT", "40%"],
      ["PRICE", "20%"],
      ["QUANTITY", "20%"],
      ["TOTAL", "20%"],
    ];
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
      <form id="cart">
        <div className="cart-wrapper">
          <div className="table-wrapper">
            <table>
              <thead  >
              <tr >
                  {headers.map((item) => (
                    <th    style={{ width: item[1]}} >
                      {item[0]}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr >
                    <td  style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <span
                        className="close-icon"
                        name={order}
                        value={order}
                        onClick={this.handleClose}
                      >
                        <FontAwesomeIcon
                          color="lightGray"
                          id="order"
                          name={order}
                          style={{
                            height: "1rem",
                            visibility: "visible",
                          }}
                          icon={faCircleXmark}
                        />
                      </span>
                      <div  className="img-wrapper">
                        <img
                          src={require("../../assets/" +
                            cart[order]["product"]["image"])}
                          alt=""
                        />
                      </div>
                      <div >{cart[order]["product"]["name"]}</div>
                    </td>
                    <td >
                      <div >
                        {"$" +
                          this.formatTwoDecimals(Number(cart[order]["price"]))}
                      </div>
                      </td>
                      <td >
                      <select
                        name={order}
                        id={keyGenerator(order)}
                        onChange={this.handleInputData}
                        //style={{ fontSize: "1.25rem" }}
                      >
                        {items.map((v) => (
                          <option
                            key={v}
                            name={order + v}
                            value={v}
                            selected={
                              Number(cart[order]["quantity"]) === v
                                ? true
                                : false
                            }
                          >
                            {v}
                          </option>
                        ))}
                      </select>
                      </td>
                      <td>
                      <div>
                        {"$" +
                          this.formatTwoDecimals(Number(cart[order]["total"]))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="summary-wrapper">
            <div>
              <div>SUMMARY</div>
              <hr />
              <div>Do you have a promo code?</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  margin: "20px",
                }}
              >
                <input type="text" style={{ width: "125px" }} />
                <button
                  onClick={this.handleDiscount}
                  className="btn"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  APPLY
                </button>
              </div>
              <hr />
              {cartData.length
                ? cartData.map((item) => (
                    <div
                   
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
              <hr />
            </div>
            <div>
              <button
                className={
                  this.state.cart["cartSubtotal"] === "0.00"
                    ? "btn btn-disabled"
                    : "btn"
                }
                onClick={this.handleButton}
                disabled={
                  this.state.cart["cartSubtotal"] === "0.00" ? true : false
                }
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Cart;
