import React from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class NavBar extends React.Component {
  constructor(props) {
    super();
    this.state ={}
  }
  goHome = () => {
    this.props.isPaid && this.props.reset();
    this.props.refreshScreen({...this.props.screensInitialStatus, navBar: true, categories: true, products: true})
  }

  handleLogInSignUp = () => {
    if (this.props.isLoggedIn) {
      let myProps = {};
      myProps["isLoggedIn"] = false;
      myProps["email"] = "";
      this.props.refreshScreen(
        {
          ...this.props.screensInitialStatus,
        categories: true, 
        products: true, 
        navBar: true, 
      },{cartQty: 0, cartSubtotal: 0, cartTotal: 0, orders: {}}, myProps)
    } else {
      this.props.refreshScreen({...this.props.screensInitialStatus, navBar: true, logInSignUp: true})
    }
   
  }
  handleClickCart = () => {
    
    this.props.cartQty > 0 ? this.props.refreshScreen({...this.props.screensInitialStatus, navBar: true, cart: true}) : alert("No items in cart")
    
  }
  render(){
   
    return (
        <nav id="topNav" className="navbar nav">
          <div className="navbar-container">
            <div className="navbar-brand" onClick={this.goHome} style={{cursor: "pointer"}}>
              Noelistic
            </div >
            <ul className="navbar-nav">
              <li className="nav-link"
               onClick={this.handleClickCart}
              style={{visibility: this.props.isPaid ? "hidden" : "visible", cursor: "pointer", position: "relative", display: "flex", justifyContent: "center", alignItems: "center"}}>
               <FontAwesomeIcon icon={faShoppingCart} fontSize ={"2rem"} /> 
                <div style={{
                  textAlign:"center",
                  position: "absolute", 
                  borderRadius: "50%",
                  //backgroundColor: "red",
                  top: "5%", 
                  left: "30%",
                  color: "white", 
                  fontSize: "0.7rem",
                  width: "1.1rem",
                  height: "1.1rem",
                  //padding: "0.25rem",
                  paddingTop: 0,
                  }}>{this.props.cartQty}</div>
                  Cart
              </li>
              <li  onClick={this.handleLogInSignUp} name="LogInsignUp" className="nav-link" style={{cursor: "pointer", width: "200px"}}>
               
                {this.props.isLoggedIn ?
                <>
                <div>Hi {this.props.email}!</div>  
                <div>Sign Out</div>
                </> : "Sign In / Sign Up"}
              </li>
             
            </ul>
          </div>
        </nav>
      );
  }
  
};

export default NavBar;
