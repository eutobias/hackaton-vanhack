// Libs
import React from "react";
import { Link } from "react-router-dom";
// Component
import ShopCartItem from "../components/ShopCartItem";

class Shopcart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      shopcart,
      products,
      addToShopCart,
      removeFromShopCart,
      alreadyInShopCart,
      placeTheOrder
    } = this.props;
    return (
      <div className="page-wrapper">
        <h3>Shop Cart</h3>
        <div className="shopcart-wrapper">
          {shopcart &&
            shopcart.map((item, key) => {
              return (
                <ShopCartItem
                  {...item}
                  key={key}
                  removeFromShopCart={removeFromShopCart}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default Shopcart;
