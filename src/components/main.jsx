import React from "react";
import LogInSignUp from "./screens/LogInSignUp/LogInSignUp";
import Shipping from "./screens/Shipping/Shipping";
import Cart from "./screens/Cart/Cart";
import Payment from "./screens/Payment/Payment";
import Confirmation from "./screens/Confirmation/Confirmation";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      screens: {
        logInSignUp: true,
       
      },
      userDatabase: {
        noel:
        {email: "noel@gmail.com", password: "noelnoel"}},
      isLoggedIn: false,
      email: "",
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
              image: "product3.png",
            },
            price: "6.00",
            quantity: "4",
            total: "24.00",
          },
        }
      },
      shippingData: {
        address: "",
        addressTitle: "",
        nameSurname: "",
        zipCode: "",
        country: "US",
        city: "SF",
        state: "CA",
        cellAreaCode: "",
        cellNumbers: "",
        telAreaCode: "",
        telNumbers: "",
        shipmentMethod: "STANDARD",
        shipmentMethodDesc: "Delivery in 4-6 working days"
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
       ...props
      
    });
  };

  render() {
    return (
      <div className="containerMax">
        <div className="container">
          {this.state.screens["logInSignUp"] ? (
            <LogInSignUp 
            refreshScreen={this.refreshState}
            userDatabase={this.state.userDatabase}
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
              shippingData = {this.state.shippingData}
              cart={this.state.cart}
            />
           
          ) : null}
           {this.state.screens["payment"] ? (
            <Payment
              refreshScreen={this.refreshState}
              cart={this.state.cart}
              shippingData = {this.state.shippingData}
              email = {this.state.email}
            />
           
          ) : null}
          {this.state.screens["confirmation"] ? (
            <Confirmation
              refreshScreen={this.refreshState}
              cart={this.state.cart}
              shippingData = {this.state.shippingData}
              card={this.state.card}
              email = {this.state.email}

            />
           
          ) : null}
        </div>
      </div>
    );
  }
}

export default Main;
