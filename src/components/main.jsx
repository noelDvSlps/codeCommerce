import React from "react";
import LogInSignUp from "./screens/LogInSignUp/LogInSignUp";
import Shipping from "./screens/Shipping/Shipping";
import Cart from "./screens/Cart/Cart";
import Payment from "./screens/Payment/Payment";
import Confirmation from "./screens/Confirmation/Confirmation";
import NavBar from "./NavBar/NavBar";
import Products from "./screens/Products/Products";
import Categories from "./Categories";
import ProductDetails from "./screens/ProductDetails/ProductDetail";
import { COMMERCE_API, COMMERCE_URL } from "./constants2";
import CommerceService from "../services";

const commerce = new CommerceService();

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      search: {
        searching: false,
        searchText: "",
      },
      
      data: [],
      data2:[],
      category: "All Products",
      loading: false,
      loading2: [],
      error: false,
      errorNumber: "",
      screens: {
        products: true,
        navBar: true,
        categories: true,
      },
      userDatabase: {
        noel: { email: "noel@gmail.com", password: "noelnoel" },
      },
      isLoggedIn: false,
      email: "",
      cart: {
        orders: {},
        cartQty: 0,
      },
      shippingData: {
        address: "",
        addressTitle: "",
        nameSurname: "",
        zipCode: "",
        country: "",
        city: "",
        state: "",
        cellAreaCode: "",
        cellNumbers: "",
        telAreaCode: "",
        telNumbers: "",
        shipmentMethod: "",
        shipmentMethodDesc: "",
      },

      screensInitialStatus: {
        logInSignUp: false,
        navBar: false,
        categories: false,
        products: false,
        productDetails: false,
        cart: false,
        shipping: false,
        payment: false,
        confirmation: false,
      },
    };
  }

  reset = () => {
    this.setState({
      cart: {
        cartQty: 0,
        orders: {},
      },
      shippingData: {
        address: "",
        addressTitle: "",
        nameSurname: "",
        zipCode: "",
        country: "",
        city: "",
        state: "",
        cellAreaCode: "",
        cellNumbers: "",
        telAreaCode: "",
        telNumbers: "",
        shipmentMethod: "",
        shipmentMethodDesc: "",
      },
      search: {
        searching: false,
        searchText: "",
      },
    });
  };

  updateDBInventoryAfterPayment = () => {
    const data = this.state.data;
    const cart = this.state.cart.orders;
    const res = Object.entries(cart).map(([name, obj]) => ({ name, ...obj }));
    data.map((item) => {
      for (let i = 0; i < res.length; i++) {
        if (item.id === res[i].id) {
          item.inventory = res[i].inventory;
          break;
        }
      }
      return item;
    });
    

    const newData2 = res.map((item) => {
      const x = data.map((record) => {
        if (item.id === record.id) {
          record.inventory = item.inventory;
        }
        return record;
      });
      return x;
    });

    this.setState({
      data: newData2[0],
    });
  };

  //use too toggle screens and pass data
  refreshState = (screens, cart, mainProps) => {
    this.setState((prevState) => ({
      ...prevState,
      screens: {
        ...this.state.screens,
        ...screens,
      },
      cart: {
        ...prevState.cart,
        ...cart,
      },
      ...mainProps,
    }));
  };

  // use for the search textbox
  searchProduct = (e) => {
     this.state.data.filter((item) =>
      item.title.toUpperCase().includes(e.target.value.toUpperCase())
    );
    
  };

  // use to ignore search textbox when sorting by category
  ignoreSearch = () => {
    this.setState((prevState) => ({
      search: {
        ...prevState.search,
        searching: false,
      },
    }));
  };

  // use to enable search text box for searching
  updateSearchText = (e) => {
    this.setState({
      search: {
        searching: true,
        searchText: e.target.value.toUpperCase(),
      },
    });
  };


  // sets what category to show
  refreshCategory = (category) => {
    this.setState((prevState) => ({
      category: category,
      search: {
        ...prevState.search,
        searching: false,
      },
    }));
  };

  updateCartQty = (newQty, orders) => {
    this.setState((prevState) => ({
      cart: {
        cartQty: Number(newQty),
        orders: orders,
      },
    }));
  };

  showProductDetails = (id , maxValue) => {
    this.setProductDetails(1);
    this.refreshState(
      {
        ...this.state.screensInitialStatus,
        navBar: true,
        productDetails: true,
      },
      null,
      { productDetailsId: id, maxValue: maxValue }
    );
  };

  setProductDetails = (qty) => {
    this.setState({ productDetailsQty: qty });
  };

  addToCart = (id, qty) => {
    let items = this.state.data.filter((item) => {
      return item.id === id;
    });

    const cartOrders =
      this.state.cart.orders[id] !== undefined
        ? this.state.cart.orders[id]
        : {};
    const isInCart = id in this.state.cart.orders;
    const prevQty = isInCart ? this.state.cart.orders[id].quantity : 0;
    const prevCartQty = Number(this.state.cart.cartQty);
    const { title, img, price, price_formatted } = items[0];
    const { inventory } =
      this.state.cart.orders[id] !== undefined ? cartOrders : items[0];
    qty = qty !== undefined ? qty : 1;

    const isInventoryEnough = inventory >= qty ? true : false;
   
    if (isInventoryEnough) {
      this.setState((prevState) => ({
        cart: {
          orders: {
            ...prevState.cart.orders,
            [id]: {
              id: id,
              name: title,
              image: img,
              price: price,
              price_formatted: price_formatted,
              quantity: qty + prevQty,
              total: price * (qty + prevQty),
              inventory: inventory - parseInt(qty),
            },
          },
          cartQty: prevCartQty + qty,
        },
      }));
    } else {
      alert("Not enough inventory");
    }
  };

 
  componentDidMount(url= COMMERCE_URL) {
    
    this.setState({ loading: true });
    commerce.fetchProductData(url)
      .then((res) => {
        if (res && res.response.ok) {
          console.log(res)
          this.setState({
            data: [...this.state.data, ...res.data],
            data2:[this.state.data, res.data],
            loading2: [...this.state.loading2, false],
            loading: false,
           
            error: false,
            pagination: res.pagination,
            errorNumber: 0,
          });

          if (res.pagination.links.next !== undefined) {
            this.componentDidMount(res.pagination.links.next);
            
            } 
            

        } else {
          this.setState({
            loading: false,
          });
        }
      }, (res, error) => {
        console.log(error);
        this.setState({
          loading: false,
          error: true,
          errorNumber: res.response.status,
          data: [],
        });
      })
  }
 
  
  render() {
  const data2 = this.state.data2
    return (
      <div className="containerMax">
        <div className="container">
          {this.state.screens["navBar"] ? (
            <NavBar
              reset={this.reset}
              isPaid={this.state.screens.confirmation}
              refreshScreen={this.refreshState}
              cartQty={this.state.cart.cartQty}
              isLoggedIn={this.state.isLoggedIn}
              email={this.state.email}
              screensInitialStatus={this.state.screensInitialStatus}
            />
          ) : null}

          <div style={{ marginTop: "100px" }}>
            {this.state.screens["logInSignUp"] ? (
              <LogInSignUp
                cartQty={this.state.cart.cartQty}
                refreshScreen={this.refreshState}
                userDatabase={this.state.userDatabase}
                screensInitialStatus={this.state.screensInitialStatus}
              />
            ) : null}

            {this.state.screens["categories"] ? (
              <Categories
                refreshCategory={this.refreshCategory}
                updateSearchText={this.updateSearchText}
                ignoreSearch={this.ignoreSearch}
                screensInitialStatus={this.state.screensInitialStatus}
              />
            ) : null}
        
           
            {this.state.screens["products"] ? (
              <Products
                showProductDetails = {this.showProductDetails}
                setProductDetails={this.setProductDetails}
                cartOrders={this.state.cart.orders}
                refreshScreen={this.refreshState}
                data={this.state.data}
                category={this.state.category}
                addToCart={this.addToCart}
                loading={this.state.loading}
                search={this.state.search}
                screensInitialStatus={this.state.screensInitialStatus}
              />
            ) : null}

            {this.state.screens["productDetails"] ? (
              <ProductDetails
              screens={this.state.screens}
                productDetailsQty = {this.state.productDetailsQty}
                setProductDetails={this.setProductDetails}
                qty={
                  this.state.productDetailsQty
                    ? this.state.productDetailsQty
                    : 1
                }
                maxValue={this.state.maxValue}
                refreshScreen={this.refreshState}
                id={this.state.productDetailsId}
                data={this.state.data}
                addToCart={this.addToCart}
                screensInitialStatus={this.state.screensInitialStatus}
              />
            ) : null}

            {this.state.screens["cart"] ? (
              <Cart
              showProductDetails = {this.showProductDetails}
                screens={this.state.screens}
                addToCart={this.addToCart}
                refreshScreen={this.refreshState}
                updateCartQty={this.updateCartQty}
                orders={this.state.cart.orders}
                isLoggedIn={this.state.isLoggedIn}
                screensInitialStatus={this.state.screensInitialStatus}
              />
            ) : null}

            {this.state.screens["shipping"] ? (
              <Shipping
                screens={this.state.screens}
                refreshScreen={this.refreshState}
                shippingData={this.state.shippingData}
                cart={this.state.cart}
                screensInitialStatus={this.state.screensInitialStatus}
              />
            ) : null}
            {this.state.screens["payment"] ? (
              <Payment
                screens={this.state.screens}
                updateDB={this.updateDBInventoryAfterPayment}
                refreshScreen={this.refreshState}
                cart={this.state.cart}
                shippingData={this.state.shippingData}
                email={this.state.email}
                screensInitialStatus={this.state.screensInitialStatus}
              />
            ) : null}
            {this.state.screens["confirmation"] ? (
              <Confirmation
                screens={this.state.screens}
                reset={this.reset}
                refreshScreen={this.refreshState}
                cart={this.state.cart}
                shippingData={this.state.shippingData}
                card={this.state.card}
                email={this.state.email}
                screensInitialStatus={this.state.screensInitialStatus}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
