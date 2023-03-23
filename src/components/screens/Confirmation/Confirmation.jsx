import React from "react";
import "./Confirmation.css";
import Progress from "../../Progress/Progress";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Summary from "../../Summary";
class Confirmation extends React.Component {
  constructor(props) {
    super();
    this.state = {
      orders: props.cart.orders,
    };
  }
  formatTwoDecimals = (amount) => {
    return (Math.round(Number(amount) * 100) / 100).toFixed(2);
  };

  handleClickCart = (e) => {
    e.preventDefault();
    alert("Track Order Soon")

  }

  handleClickHome = (e) => {
    e.preventDefault();
    this.props.reset();
    this.props.refreshScreen({
      navBar: true,
      categories: true,
      products: true,
      confirmation: false,
    });
  };
  render() {
    //const cart = this.props.cart["orders"];
    const cart = this.state.orders;
   
   
    return (
      <div className="confimationWrapper">
        <form className="confirmationForm">
          <Progress processNumber={4} />

          <div className="hero-wrapper">
            <div className="confirmation-info">
              <div>
                <span className="confirm-icon">
                  <FontAwesomeIcon
                    color="red"
                    fontWeight={600}
                    fontSize={"50px"}
                    icon={faCheck}
                  />
                </span>
              </div>
              <div>
                <div>
                  <strong>Congratulations.</strong>
                </div>
                <div>
                  <strong>Your Order is accepted</strong>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div>
                <button
                  className="btn"
                  style={{ backgroundColor: "black", width: "40%" }}
                  onClick = {this.handleClickCart}
                >
                  TRACK ORDER
                </button>
              </div>
              <div>
                <button
                  onClick={this.handleClickHome}
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
              <Summary
                email={this.props.email}
                screens={this.props.screens}
                card={this.props.card}
                shippingData={this.props.shippingData}
                cart={cart}
                cartSubtotal={this.props.cart.cartSubtotal}
                shipping={this.props.cart.shipping}
                discount={this.props.cart.discount}
                cartTotal={this.props.cart.cartTotal}
                handleDiscount={undefined}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Confirmation;
