// Libs
import React from "react";

// Component
import Store from "../components/Store";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllStores();
  }

  render() {
    let { stores, getAllProductsFromStore, addToShopCart } = this.props;
    return (
      <div className="page-wrapper">
        <h3>Stores</h3>
        <div className="store-wrapper">
          {stores &&
            stores.map((item, key) => {
              return (
                <Store
                  {...item}
                  key={key}
                  item={item}
                  addToShopCart={addToShopCart}
                  getAllProductsFromStore={getAllProductsFromStore}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default Home;
