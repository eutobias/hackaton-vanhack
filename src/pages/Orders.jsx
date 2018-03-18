// Libs
import React from "react";
import axios from "axios";

// Component
class Orders extends React.Component {
  componentDidMount() {
    let data = {
      id: 0,
      date: "2018-03-18T18:15:53.430Z",
      customerId: 0,
      deliveryAddress: "aaaaa",
      contact: "aaaaa",
      storeId: 0,
      orderItems: [
        {
          id: 0,
          orderId: 0,
          productId: 0,
          product: {
            id: 0,
            storeId: 0,
            name: "string",
            description: "string",
            price: 0
          },
          price: 0,
          quantity: 0,
          total: 0
        }
      ],
      total: 0,
      status: "string",
      lastUpdate: "2018-03-18T18:15:53.431Z"
    };
    // axios
    //   .post(
    //     `//api-vanhack-event-sp.azurewebsites.net/api/v1/Order`,
    //     data,
    //     {
    //       headers: {
    //         'Authorization': `Bearer ${this.props.authHash}`,
    //         'Content-Type':'application/json-patch+json'
    //       }
    //     }
    //   )
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    axios
      .get("//api-vanhack-event-sp.azurewebsites.net/api/v1/Store")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>I'm Orders</h3>
      </div>
    );
  }
}

export default Orders;
