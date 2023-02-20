import React from "react";
import LogInSignUp from "./screens/LogInSignUp/LogInSignUp";
import Shipping from "./screens/Shipping/Shipping";
import Cart from "./screens/Cart/Cart";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      screens: {
        logInSignUp: true,
        cart: false,
        shipping: false,
      },
      user: {
        userName: "",
        password: "",
      },
      currentScreenProps: "",

      cart: {
        orders: {
          order1: {
            product: {
              name: "Amazing Code",
              image: "product1.png",
            },
            price: "10.00",
            quantity: "2",
            total: "20.00",
          },

          order2: {
            product: {
              name: "Awesome Code",
              image: "product2.png",
            },
            price: "4.00",
            quantity: "4",
            total: "16.00",
          },

          order3: {
            product: {
              name: "Yeah! Code",
              image: "product1.png",
            },
            price: "6.00",
            quantity: "4",
            total: "24.00",
          },
        }
      }
    };
  }


  refreshState = (unMount, mount, props) => {
    this.setState({
      screens: {
        ...this.state.screens,
        [unMount]: false,
        [mount]: true,
      },
      cart: props,
    });
  };

  render() {
    return (
      <div className="containerMax">
        <div className="container">
          {this.state.screens["logInSignUp"] ? (
            <LogInSignUp 
            refreshScreen={this.refreshState}
            cart={this.state.cart}
            />
          ) : null}
          {this.state.screens["cart"] ? (
            <Cart
              refreshScreen={this.refreshState}
              cart={this.state.cart}
            />
          ) : null}
          {this.state.screens["shipping"] ? (
            <Shipping
              refreshScreen={this.refreshState}
              cart={this.state.cart}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Main;
