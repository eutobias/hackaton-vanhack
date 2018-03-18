// Libs
import React from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from "axios";

// Components
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Shopcart from "./pages/Shopcart";

//CSS
require("./scss/reset");
require("./scss/main");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.customerLogin = this.customerLogin.bind(this);

    this.getAllStores = this.getAllStores.bind(this);
    this.getAllProductsFromStore = this.getAllProductsFromStore.bind(this);
    this.addToShopCart = this.addToShopCart.bind(this);
    this.alreadyInShopCart = this.alreadyInShopCart.bind(this);
    this.removeFromShopCart = this.removeFromShopCart.bind(this);

    this.state = {
      isLoggedIn: false,
      products: [],
      stores: [],
      shopcart: [],
      authHash: ""
    };
  }

  getAllStores() {
    console.log("getting all stores");
    if (this.state.stores.length === 0) {
      axios
        .get("//api-vanhack-event-sp.azurewebsites.net/api/v1/Store")
        .then(response => {
          if (response.status === 200) {
            console.log("got all stores", response.data);
            this.setState({ stores: response.data });
          }
        })
        .catch(error => {
          console.log("server error ", error);
        });
    }
  }

  getAllProductsFromStore(store) {
    console.log("getting all products from store ", store);
    axios
      .get(
        `//api-vanhack-event-sp.azurewebsites.net//api/v1/Store/${
          store.id
        }/products`
      )
      .then(response => {
        if (response.status === 200) {
          console.log("got all products", response.data);
          this.setProductsForStore(store, response.data)
        }
      })
      .catch(error => {
        console.log("server error ", error);
      });
  }

  setProductsForStore(store, products) {
    let stores = this.state.stores;
    for (let i = 0; i < stores.length; i++) {
      if (stores[i].id === store.id) {
        stores[i].products=products  
      }
    }
    this.setState({stores: stores})
  }

  alreadyInShopCart(id) {
    console.log('check if item is already in cart', this.state.shopcart)
    if (this.state.shopcart.length === 0) return -1;

    let shopcart = this.state.shopcart;
    for (let i = 0; i < shopcart.length; i++) {
      if (shopcart[i].item.id === id) {
        return i;
      }
    }

    return -1;
  }

  addToShopCart(item) {
    console.log('adding a product to shopcart ', item)
    let shopcart = this.state.shopcart;
    let isInShopCart = this.alreadyInShopCart(item.id);

    if (isInShopCart === -1) {
      console.log('item is not in cart, inserting...');
      shopcart.push({ item: item, quantity: 1 });
    } else {
      console.log('item is already in cart, updating quantity...');
      shopcart[isInShopCart].quantity += 1;
    }

    this.setState({ shopcart: shopcart });
  }

  removeFromShopCart(id) {
    let shopcart = this.state.shopcart;
    let isInShopCart = this.alreadyInShopCart(id);

    if (isInShopCart !== -1) shopcart.splice(isInShopCart, 1);

    this.setState({ shopcart: shopcart });
  }

  customerLogin(status, authHash) {
    if (status === true) {
      this.setState({ isLoggedIn: status, authHash: authHash });
    }
  }

  render() {
    return (
      <Router>
        <div className="app-wrapper">
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            </ul>
          </nav>

          {this.state.shopcart && (
            <aside>
              <p>
                You have {this.state.shopcart.length} product(s) in your cart. /{" "}
                <Link to="/shopcart">View your cart</Link>
              </p>
            </aside>
          )}

          <div className="content-wrapper">
            <PrivateRoute
              exact
              path="/"
              component={Home}
              isLoggedIn={this.state.isLoggedIn}
              stores={this.state.stores}
              getAllStores={this.getAllStores}
              getAllProductsFromStore={this.getAllProductsFromStore}
              addToShopCart={this.addToShopCart}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} customerLogin={this.customerLogin} />
              )}
            />
            <PrivateRoute
              path="/orders"
              component={Orders}
              isLoggedIn={this.state.isLoggedIn}
              shopcart={this.state.shopcart}
              placeAOrder={this.placeAOrder}
              authHash={this.state.authHash}
              placeAOrder={this.placeAOrder}
            />
            <PrivateRoute
              path="/shopcart"
              component={Shopcart}
              isLoggedIn={this.state.isLoggedIn}
              removeFromShopCart={this.removeFromShopCart}
              shopcart={this.state.shopcart}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
