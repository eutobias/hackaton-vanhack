import React from "react";
import { Link } from "react-router-dom";

import Product from "./Product";

const Store = props => {
  let {
    id,
    name,
    address,
    cousineId,
    products,
    item,
    getAllProductsFromStore,
    addToShopCart
  } = props;

  return (
    <div className="store-item">
      <h4>{name}</h4>
      <p>{address}</p>

      {products ? (
        <div className="products-wrapper">
          {products.map((item, key) => {
            return (
              <Product {...item} item={item} key={key} addToShopCart={addToShopCart} />
            );
          })}
        </div>
      ) : (
        <button onClick={getAllProductsFromStore.bind(this, item)}>
          See the products
        </button>
      )}
    </div>
  );
};

export default Store;
