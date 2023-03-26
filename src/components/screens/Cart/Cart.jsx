import React from "react";
import "./Cart.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderCounter from "../../OrderCounter";
import Summary from "../../Summary";
class Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      orders: props.orders,
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
        discount: "4.50",
      }),
      this.handleTotalPrice
    );
  };

  handleInputData2 = (myEl) => {
    const { value, name } = myEl;
    const tempCart = this.state["orders"];
    const tempObj = tempCart[name];
    const inventoryQty =
      tempObj["inventory"] - parseInt(Number(value) - tempObj["quantity"]);
    const orderQty = Number(value);
    if (inventoryQty > -1 && orderQty > -1) {
      tempObj["inventory"] = inventoryQty;
      tempObj["quantity"] = orderQty;
      const newPrice = this.formatTwoDecimals(Number(value) * tempObj["price"]);
      tempObj["total"] = newPrice;
      this.setState((prevState) => ({
        orders: {
          ...prevState.orders,
          [name]: tempObj,
        },
      }));
      this.handleTotalPrice();
    }
  };

  handleInputData = ({ target: { name, id, value } }) => {
    const tempCart = this.state.orders;
    const tempObj = tempCart[name];
    tempObj["quantity"] = Number(value);
    const newPrice = this.formatTwoDecimals(Number(value) * tempObj["price"]);
    tempObj["total"] = newPrice;
    this.setState((prevState) => ({
      orders: {
        ...prevState.orders,
        [name]: tempObj,
      },
    }));
    this.handleTotalPrice();
  };

  handleTotalPrice = () => {
    const subTotal = this.getSubtotal();
    const total = this.formatTwoDecimals(this.getTotal(subTotal));
    this.setState((prevState) => ({
      cartSubtotal: subTotal,
      cartTotal: total,
    }));
  };

  getSubtotal = () => {
    const cart = this.state.orders;
    const orders = Object.keys(cart);
    let subTotal = orders
      .map((order) => Number(cart[order]["total"]))
      .reduce((tempPrice, value) => tempPrice + value);
    return this.formatTwoDecimals(subTotal);
  };

  getcartQty = (myCart) => {
    const cart = myCart;
    try {
      const orders = Object.keys(cart);
      let subTotal = orders
        .map((order) => Number(cart[order]["quantity"]))
        .reduce((initial, qty) => initial + qty);
      return subTotal;
    } catch {
      return 0;
    }
  };

  getTotal = (subTotal) => {
    const discount = this.state.discount ? this.state.discount : 0;
    const shipping = this.state.shipping ? this.state.shipping : 0;
    return Number(subTotal) - Number(discount) + Number(shipping);
  };

  handleClose = (e, value) => {
    let elName =
      value === undefined
        ? e.currentTarget.attributes.getNamedItem("name").value
        : value;
    console.log(e, value);
    const myObj = this.state.orders;
    const updatedCart = Object.keys(myObj)
      .filter((key) => key !== elName)
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: this.state.orders[key],
        });
      }, {});

    this.setState(
      (prevState) => ({
        orders: updatedCart,
      }),

      Object.keys(updatedCart).length !== 0
        ? this.handleTotalPrice
        : this.props.refreshScreen(
            {
              ...this.props.screensInitialStatus,
              products: true,
              navBar: true,
              categories: true,
            },
            { orders: {}, cartQty: 0 }
          )
    );
    this.props.updateCartQty(this.getcartQty(updatedCart), updatedCart);
  };
  showProductDetails = (e) => {
    this.props.showProductDetails(
      e.target.title,
      this.state.orders[e.target.title].inventory
    );
    
  };

  handleButton = (e) => {
    e.preventDefault();

    if (this.props.isLoggedIn) {
      let myProps = {};
      myProps["cart"] = this.state;
      myProps["cart"]["cartSubtotal"] = this.state.cartSubtotal;
      this.props.refreshScreen(
        { ...this.props.screensInitialStatus, shipping: true, navBar: true },
        { cartSubtotal: this.state.cartSubtotal, discount: this.state.discount }
      );
    } else {
      this.props.refreshScreen(
        { ...this.props.screensInitialStatus, navBar: true, logInSignUp: true },
        { cartSubtotal: this.state.cartSubtotal }
      );
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.handleTotalPrice();
    });
  }

  render() {
    const items = [];
    for (let i = 1; i <= 10; i++) {
      items.push(i);
    }

    const headers = [
      ["PRODUCT", "40%"],
      ["PRICE", "20%"],
      ["QUANTITY", "20%"],
      ["TOTAL", "20%"],
    ];

    const cart = this.state["orders"];
    const orders = Object.keys(cart);
    const { cartSubtotal, shipping, discount, cartTotal } = this.state;

    return (
      <form id="cart">
        <div className="cart-wrapper">
          <div name="table-wrapper" className="table-wrapper">
            <table>
             

              <tbody style={{display: "inline"}}>
              {/* <thead style={{display: "inline"}}> */}
                <tr>
                  {headers.map((item, index) => (
                    <td key={index} style={{ width: item[1] }}>
                      {item[0]}
                    </td>
                  ))}
                </tr>
              {/* </thead> */}
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <span
                        className="delete-icon"
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
                      <div>
                      <div className="img-wrapper">
                        <img
                          src={cart[order]["image"]}
                          title={order}
                          className="cart-product"
                          onClick={this.showProductDetails}
                          alt=""
                        />
                      </div>
                      <div
                     
                        title = {order}
                        className="cart-product"
                        style={{maxWidth: "50px"}}
                        onClick={this.showProductDetails}
                      >
                        {cart[order]["name"]}
                      </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {"$" +
                          this.formatTwoDecimals(Number(cart[order]["price"]))}
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "center" }}>
                        <OrderCounter
                          
                          screens={this.props.screens}
                          key={order}
                          addToCart={this.props.addToCart}
                          id={order}
                          handleInputData2={this.handleInputData2}
                          handleClose={this.handleClose}
                          inputOnChange={this.handleInputData}
                          inputDefaultValue={cart[order]["quantity"]}
                          maxValue={
                            cart[order]["quantity"] + cart[order]["inventory"]
                          }
                        />
                      </div>
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
            <Summary
              screens={this.props.screens}
              cart={cart}
              cartSubtotal={cartSubtotal}
              shipping={shipping}
              discount={discount}
              cartTotal={cartTotal}
              handleDiscount={this.handleDiscount}
            />
            <div>
              <button
                className={
                  this.state["cartSubtotal"] === "0.00"
                    ? "btn btn-disabled"
                    : "btn"
                }
                onClick={this.handleButton}
                disabled={
                  // this.state.cart["cartSubtotal"] === "0.00" ? true : false
                  this.state["cartSubtotal"] === "0.00" ? true : false
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
