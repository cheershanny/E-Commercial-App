import React, { useState, useEffect } from "react";

function OrderDetail({user_id}) {
  const [orders, setOrders] = useState({});
  const [total, setTotal] = useState(0);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    fetch(`/profile/${user_id}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [user_id]);

  useEffect(() => {
    fetch(`/profile/${user_id}/total`)
      .then((res) => res.json())
      .then((data) => {
        const total = data[0].total;
        setTotal(total);
      })
      .catch((err) => console.error("Error fetching total:", err));
  }, [user_id]);


  if (!showOrders) {
    return (
      <button className="viewOrderDetails" onClick={() => setShowOrders(true)}>View Order Details</button>
    );
  }

  return (
    <div className="order-details">
      <h3>Order Details:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.order_id}>
            <span>{order.product_name}</span>
            <span>{order.quantity_ordered}</span>
            <span>${order.subtotal}</span>
          </li>
        ))}
      </ul>
      <div className="total-price">
        <h4>Total:</h4>
        <p>${total}</p>
      </div>
      <button onClick={() => setShowOrders(false)}>Close</button>
    </div>
  );
}

export default OrderDetail;

