import React, { useState, useEffect } from "react";

function OrderDetail(props) {
  const userId = props.userId;
  const [orders, setOrders] = useState({});
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    fetch(`/profile/${userId}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId]);

  if (!showOrders) {
    return (
      <button className="viewOrderDetails" onClick={() => setShowOrders(true)}>View Order Details</button>
    );
  }

  return (
    <div className="order-details">
      <h3>Order Details:</h3>
      <ul>
        {console.log(orders)}
        {orders.map((order) => (
          <li key={order.order_detail_id}>
            <span>{order.product_name}</span>
            <span>{order.quantity_ordered}</span>
            <span>${order.subtotal}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowOrders(false)}>Close</button>
    </div>
  );
}

export default OrderDetail;
