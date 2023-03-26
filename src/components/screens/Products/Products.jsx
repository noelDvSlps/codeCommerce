import React from "react";
import ProductCard from "../../ProductCard";
import "../../ProductCard.css"

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const categories = [
      "All Products",
      "Appliances",
      "Phones",
      "Apparels",
      "Food",
    ];
    let cartOrders = this.props.cartOrders;
    let data = this.props.data.filter((item) => {
      return this.props.category === categories[0]
        ? item.category
        : item.category.toUpperCase() === this.props.category.toUpperCase();
    });
    if (this.props.search.searching === true) {
      data = data.filter((item) =>
        item.title.toUpperCase().includes(this.props.search.searchText)
      );
    }
    return (
    
          <div style={{ marginTop: "50px", }}>
            {
            
            !this.props.loading ? (
              data.map((item) => (

                <ProductCard
                  showProductDetails = {this.props.showProductDetails}
                  setProductDetails = {this.props.setProductDetails}
                  maxValue = {cartOrders[item.id] === undefined ? item.inventory :cartOrders[item.id].inventory}
                  screensInitialStatus = {this.props.screensInitialStatus}
                  refreshScreen={this.props.refreshScreen}
                  key={item.id}
                  addToCart={this.props.addToCart}
                  item={item}
                />
              ))
            ) : (
              <div>Loading...</div>
            )
            
            
            }
          </div>
      
      
    );
  }
}

export default Products;
