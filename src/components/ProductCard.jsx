import React from "react";
import "./ProductCard.css";

class ProductCard extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  showProductDetails = ({ target: { title } }) => {
    this.props.showProductDetails(title, this.props.maxValue)
    // this.props.setProductDetails(1);
    // this.props.refreshScreen(
    //   {
    //     ...this.props.screensInitialStatus,
    //     navBar: true,
    //     productDetails: true,
    //   },
    //   null,
    //   { productDetailsId: title, maxValue: this.props.maxValue }
    // );
  };

  handleAddToCart = ({ target: { id } }, callBack = this.animationButton) => {
    this.props.addToCart(id, this.state.qty);
    callBack(id);
    this.setState({ qty: Number(1) });

  };

  animationButton = (id) => {
    const button = document.getElementById(id);
    button.classList.add("buttonClicked");
    setTimeout(() => {
      button.classList.remove("buttonClicked");
    }, 375);
  };

  handleChangeQty = ({ target: { value } }) => {
    this.setState({ qty: Number(value) });
  };

  render() {
    const { img, title, id, category, price_formatted, inventory } =
      this.props.item;
    const qtyIncart = inventory - this.props.maxValue;
    let arrQty = [];
    for (let i = 1; i <= this.props.maxValue; i++) {
      arrQty.push(i);
    }
    return (
      <div
        id="prod"
       
      >
        <div  className = "productCard" style={{ height: "90%" }}>
          <img
            onClick={this.showProductDetails}
            title={id}
            className="product"
            src={img}
            alt=""
          />
          {this.props.maxValue > 0 ? (
            <>
              <label style={{ display: "inline" }}>qty:</label>
              <select
                style={{ textAlign: "center", width: "50px" }}
                onChange={this.handleChangeQty}
                name={`select${id}`}
                id={`qty${id}`}
                value = {this.state.qty}
              >
                {arrQty.map((num) => (
                  <option key={`qty${id}${num}`} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {qtyIncart !== 0 && (
                <label
                  style={{ textAlign: "center", color: "red", fontWeight: 600 }}
                >
                  {" "}
                  {qtyIncart + " in cart"}
                </label>
              )}
            </>
          ) : (
            <label
              style={{ textAlign: "center", color: "red", fontWeight: 600 }}
            >
              {inventory === 0
                ? "OUT OF STOCK"
                : qtyIncart + " in cart(max qty). Click cart to edit quantity."}
            </label>
          )}

          <p className="product" title={id} onClick={this.showProductDetails}>
            {title}
          </p>
          <p>{price_formatted}</p>
          <div>{category}</div>
        </div>

        <button
          disabled={this.props.maxValue > 0 ? false : true}
          onClick={this.handleAddToCart}
          id={id}
          className={this.props.maxValue > 0 ? "btn" : "btn btn-disabled"}
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

export default ProductCard;
