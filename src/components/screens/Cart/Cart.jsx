import React from "react";
import "./Cart.css";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { keyGenerator } from "../../keyGenerator";

class Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      cart : props.cart
    }
  }

  delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  test = async () => {
    // console.log('start timer');
    await this.delay(1);
    // console.log('after 1 second');
  };

  formatTwoDecimals = (amount) => {
    return (Math.round(Number(amount) * 100) / 100).toFixed(2);
  };

  handleTest = (e) => {
    alert("");
  };

  handleInputData = ({ target: { name, id } }) => {
    console.log(id);
    const value = document.getElementById(id).value;
    const tempCart = this.state.cart["orders"];
    const tempObj = tempCart[name];
    tempObj["quantity"] = Number(value);
    const newPrice = this.formatTwoDecimals(Number(value) * tempObj["price"]);
    tempObj["total"] = newPrice;
    this.setState((prevState) => ({
      cart: {
        orders: {
          ...prevState.cart["orders"],
          [name]: tempObj,
        },
      },
    }));
    this.handleTotalPrice();
  };

  handleTotalPrice = () => {
    this.setState((prevState) => ({
      cart:{
        ...prevState.cart,
        cartSubtotal: this.getTotal(),
      }
    }));
  };

  getTotal = () => {
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

  handleNothing = () => {
    return 50;
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
    this.setState({ cart: { orders: updatedCart } }, this.handleTotalPrice);
  };

  handleButton = (e) => {
    e.preventDefault();

    this.props.refreshScreen("cart", "shipping", this.state.cart);
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
    return (
      <form id="cart">
        <div className="cart-wrapper">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {headers.map((item) => (
                    <th style={{ width: item[1] }} key={item[0]}>
                      {item[0]}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order}>
                    {Object.keys(cart[order]).map((val) => (
                      <td
                        style={{
                          textAlign: val === "product" ? "left" : "center",
                        }}
                        key={order + val}
                      >
                        {val === "product" && (
                          <span
                            className="close-icon"
                            name={order}
                            value={order}
                            onClick={this.handleClose}
                          >
                            <FontAwesomeIcon
                              color="gray"
                              id="order"
                              name={order}
                              style={{
                                height: "1rem",
                                visibility: "visible",
                              }}
                              icon={faCircleXmark}
                            />
                          </span>
                        )}
                        {/* <img src={require("../../assets/" + "product1.png")} alt="" /> */}

                        {val === "quantity" ? (
                         
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
                                selected={Number( cart[order][val]) === v ? true : false}
                              >
                                {v}
                              </option>
                            ))}
                          </select>
                        ) : val === "total" || val === "price" ? (
                          "$" + this.formatTwoDecimals(Number(cart[order][val]))
                        ) : (
                          <div style={{ display: "inline-table" }}>
                            <div className="img-wrapper">
                              <img
                                src={require("../../assets/" +
                                  cart[order][val]["image"])}
                                alt=""
                              />
                            </div>

                            {cart[order][val]["name"]}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="summary-wrapper">
            <div>
              <div onClick={this.getTotal}>SUMMARY</div>
              <div id="total" value={this.state.cart["cartSubtotal"]}>
                {"Cart Sub Total: $ " + this.state.cart["cartSubtotal"]}
              </div>
            </div>
            <div>
              <button
                className={
                  this.state.cart["cartSubtotal"] === "0.00" ? "btn btn-disabled" : "btn"
                }
                onClick={this.handleButton}
                disabled={this.state.cart["cartSubtotal"] === "0.00" ? true : false}
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
