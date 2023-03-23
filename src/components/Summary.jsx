import React from "react";

class Summary extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }
  formatTwoDecimals = (amount) => {
    return (Math.round(Number(amount) * 100) / 100).toFixed(2);
  };
  render() {
    const cart = this.props.cart;
    const orders = Object.keys(cart);
    const { cartSubtotal, shipping, discount, cartTotal } = this.props;

    let cartData = [
      { label: "Cart Subtotal", value: "$" + cartSubtotal },
      {
        label: "Shipping and Handling",
        value: shipping > 0 ? "+ $" + shipping : "-",
      },
      { label: "Discount", value: discount > 0 ? "- $" + discount : "-" },
      { label: "Cart Total", value: "$" + cartTotal },
    ];
    return (
      <div>
        <div>
          <div>SUMMARY</div>

          {this.props.screens.cart === false && (
            <table style={{width: "100%"}}>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div className="img-wrapper">
                        <img src={cart[order]["image"]} alt="" />
                      </div>
                    </td>

                    <td>
                      <div>
                        <strong>{cart[order]["name"]}</strong>
                      </div>
                      <div>QTY: {Number(cart[order]["quantity"])}</div>
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
          )}

          {this.props.screens.cart === true && (
            <>
              <hr />
              <div>Do you have a promo code?</div>
              <div className="promo-code">
                <input type="text" style={{ width: "125px" }} />
                <button
                  onClick={this.props.handleDiscount}
                  className="btn"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  APPLY
                </button>
              </div>
            </>
          )}

          <hr />
          {cartData.length
            ? cartData.map((item) => (
                <div
                  key={item.label}
                  className="cart-data"
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
         
        </div>


        



        {this.props.shippingData && (
          <div name="shipmentMethod">
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
            <hr />
            <div>
              <strong>SHIPMENT METHOD</strong>
            </div>
            <div>
              {this.props.shippingData &&
                this.props.shippingData["shipmentMethod"]}
            </div>
            <div>
              {this.props.shippingData &&
                this.props.shippingData["shipmentMethodDesc"]}
            </div>
          </div>
        )}

        {this.props.card && (
          <>
            <div name="PAYMENT">
              <div>
                <strong>PAYMENT</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    style={{
                      width: "65px",
                      border: "1px solid gray",
                      borderRadius: "5px",
                      marginRight: "20px",
                    }}
                    src={require("../../src/components/assets/cards/" +
                      this.props.card["cardData"]["cardType"].toLowerCase() +
                      ".png")}
                    alt=""
                  />
                </div>

                <div style={{ textAlign: "left" }}>
                  {this.props.card["cardData"]["cardType"]} Card ending in{" "}
                  {this.props.card["cardData"]["card"]
                    .split(" ")
                    .join("")
                    .slice(-4)}
                  <div>Total payment of $ {this.props.cartTotal}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Summary;
