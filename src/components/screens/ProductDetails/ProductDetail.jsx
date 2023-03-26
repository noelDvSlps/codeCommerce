import React from "react";
import OrderCounter from "../../OrderCounter";
import "../ProductDetails/ProductDetails.css"

class ProductDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      qty: 1,
      maxValue: props.maxValue,
    };
  }
  handleAddToCart = ({ target: { id } }) => {
    this.setState({ maxValue: this.state.maxValue - Number(this.props.qty) });
    const button = document.getElementById(id);
    button.classList.add("buttonClicked");
    this.props.addToCart(id, this.props.qty);
    setTimeout(() => {
      button.classList.remove("buttonClicked");
    }, 375);
    this.props.setProductDetails(1);
  };

  handleChangeQty = (myEl) => {
    this.setState({ qty: Number(myEl.value) });
  };

  render() {
    let obj = this.props.data.find((o) => o.id === this.props.id);
    const { img, id, title, category, price_formatted, description } = obj;

    let arrQty = [];
    for (let i = 1; i < 11; i++) {
      arrQty.push(i);
    }
    return (
      <div className="product-details" >
        <div>
          <img src={img} alt="" />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {this.state.maxValue === 0 ? (
              <div>All inventory qty already in the cart.</div>
            ) : (
              <>
                <label style={{ display: "inline" }}>qty:</label>
                <OrderCounter
                  screens={this.props.screens}
                  productDetailsQty={this.props.productDetailsQty}
                  setProductDetails={this.props.setProductDetails}
                  maxValue={this.state.maxValue}
                  inputDefaultValue={1}
                  id={id}
                  additionalFunction={this.handleChangeQty}
                />
              </>
            )}

            <p title={id} onClick={this.showProductDetails}>
              {title}
            </p>
            <p>{price_formatted}</p>
            <div>{category}</div>
            <div dangerouslySetInnerHTML={{ __html: description }} />

            {this.state.maxValue > 0 && (
              <button
                onClick={this.handleAddToCart}
                id={id}
                className="btn"
                style={{ width: "150px" }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
