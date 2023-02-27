import React from "react";
import "./Confirmation.css";
import Progress from "../../Progress/Progress";
import {
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Confirmation extends React.Component {
  formatTwoDecimals = (amount) => {
    return (Math.round(Number(amount) * 100) / 100).toFixed(2);
  };
  render() {
    const cart = this.props.cart["orders"];
    const orders = Object.keys(cart);
    const {cartSubtotal, shipping, discount, cartTotal} = this.props.cart

    let cartData = [
      { label: "Cart Subtotal", value: "$" + cartSubtotal },
      {label: "Shipping and Handling", value: shipping > 0 ? "+ $" + shipping : "-"},
      { label: "Discount", value: discount > 0 ? "- $" + discount : "-" },
      { label: "Cart Total", value: "$" + cartTotal },
    ];
    return (
      <div className="confimationWrapper">
        <form className="confirmationForm">
          <div className="progress" style={{ marginBottom: "25px" }}>
            <Progress processNumber={4} />
          </div>
          <div className="hero-wrapper">
            <div className="confirmation-info">
              <div>
                <span
                  className="close-icon"
                  style={{
                    backgroundColor: "white",
                    border: "4px solid red",
                    padding: "18px",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <FontAwesomeIcon
                    color="red"
                    fontWeight={600}
                    fontSize={"50px"}
                    icon={faCheck}
                  />
                </span>
              </div>
              <div>
                <div><strong>Congratulations.</strong></div>
                <div><strong>Your Order is accepted</strong></div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div>
                <button
                  className="btn"
                  style={{ backgroundColor: "black", width: "40%" }}
                >
                  TRACK ORDER
                </button>
              </div>
              <div>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "30%",
                  }}
                >
                  BACK HOME PAGE
                </button>
              </div>
            </div>

            <div className="confirmation-summary">
              <div className="shipping-summary-wrapper">
                <div>
                  <strong>SUMMARY</strong>
                </div>
                <table style={{ width: "100%" }}>
                  <tbody>
                    {orders.map((order) => (
                      <tr>
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
                            <div>
                              <strong>{cart[order]["product"]["name"]}</strong>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>QTY: {Number(cart[order]["quantity"])}</div>
                        </td>

                        <td>
                          <div style={{ textAlign: "right" }}>
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
              <br />
              <hr />
              <div name="PAYMENT">
                <div>
                  <strong>PAYMENT</strong>
                </div>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>

                  <div>
                    <img
                      style={{
                        width: "65px",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        marginRight: "20px",
                      }}
                      src={require("../../assets/cards/" +
                        this.props.card["cardData"]["cardType"].toLowerCase() +
                        ".png")}
                      alt=""
                    />
                  </div>

                  <div style={{textAlign: "left"}}>
                  {this.props.card["cardData"]["cardType"]} Card ending in{" "}
                  {this.props.card["cardData"]["card"]
                    .split(" ")
                    .join("")
                    .slice(-4)}
                     <div>Total payment of $ {this.props.cart["cartTotal"]}</div>
                  </div>

                </div>

               
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Confirmation;
