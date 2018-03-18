import React from "react";
import { Link } from "react-router-dom";

const ShopCartItem = props => {
  let { item, quantity,removeFromShopCart } = props;

  return (
    <div className="shopcart-item">
      <h5>{item.name}</h5>
      <p>{item.description}</p>
      <span>Price: {item.price}</span>
      <span>Quantity: {quantity}</span>
      <button onClick={removeFromShopCart.bind(this,item.id)}>Remove</button>
    </div>
  );
};

export default ShopCartItem;
