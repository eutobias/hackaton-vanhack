import React from "react";
import { Link } from "react-router-dom";

const Product = props => {
  let { name, description, price, id, addToShopCart, item } = props;

  return (
    <div className="product-item">
      <h5>{name}</h5>
      <p className="description">{description}</p>
      <p className="price">{price}</p>

      {addToShopCart && (
        <button onClick={addToShopCart.bind(this, item)}>Add +1 to cart</button>
      )}
    </div>
  );
};

export default Product;
