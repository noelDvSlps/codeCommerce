import React from "react";

class OrderCounter extends React.Component {
   
  constructor(props) {
    super();
    this.state = {};
  }
  changeQty = (e, addToCart = this.props.addToCart, id= this.props.id, 
    handleClose = this.props.handleClose, maxValue = this.props.maxValue, setProductDetails = this.props.setProductDetails) => {
    e.preventDefault();
    let myEl;
    let qty;
    let postValue;
    

    if (e.target.id === "btnPlus") {
      myEl = e.target.previousElementSibling;
      const { value } = myEl;
      postValue = Number(value) + 1
      if (postValue <= maxValue)
      {e.target.previousElementSibling.value = postValue;
      qty = 1;} else {
        postValue -- ;
        qty = 0 ;
        alert('Limit reached!')
      }
    } else {
      myEl = e.target.nextElementSibling;
      const { value } = myEl;
      
      postValue = Number(value) - 1
      if (postValue > 0) {
        e.target.nextElementSibling.value = postValue;
        qty = -1
      } else {
        postValue = 1;
        qty = 0 ;
        alert('Limit reached!')
      }
    }

    addToCart ? addToCart(id, qty) : setProductDetails(postValue)
    // console.log(this.props.additionalFunction ? "yes" : "no")
    this.props.handleInputData2 && this.props.handleInputData2(myEl)
   
    
    
    if (postValue === 0) {
      handleClose(e, e.target.name )
    } 
  };

  render() {
    const {inputOnChange, inputDefaultValue} = this.props
    return (
      <div style={{ textAlign: "center" }}>
        <button
         name={this.props.id}
        //  key ={"btn_A" + this.props.id}
          id="btnMinus"
          onClick={this.changeQty}
          style={{ display: "inline" }}
        >
          -
        </button>
        <input
          //value = {this.props.productDetailsQty}
          
          readOnly = {true}
          name={this.props.id}
          style={{ display: "inline", width: "50px", textAlign: "center" }}
          value={this.props.screens.cart === true ? inputDefaultValue : this.props.productDetailsQty }
          onChange={inputOnChange}
          type="text"
        />
        <button 
        name={this.props.id}
        id="btnPlus" 
        
        onClick={this.changeQty}>
            +
        </button>
      </div>
    );
  }
}

export default OrderCounter;
