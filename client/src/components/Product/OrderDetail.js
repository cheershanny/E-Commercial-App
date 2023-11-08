import React, { useState, useEffect, useCallback } from "react";

function OrderDetail({ user_id }) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [showOrders, setShowOrders] = useState(false);

  const fetchTotal = useCallback(async () => {
    try {
      const res = await fetch(`/profile/${user_id}/total`);
      const data = await res.json();
      setTotal(data[0].total);
    } catch (err) {
      console.error("Error fetching total:", err);
    }
  }, [user_id]);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch(`/profile/${user_id}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }, [user_id]);

  useEffect(() => {
    fetchOrders();
    fetchTotal();
  }, [fetchOrders, fetchTotal]);

  const handleClickRemove = async (order_id) => {
    try {
      const response = await fetch(`/profile/${user_id}/orders/${order_id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Error removing one item from order");
      }

      const updatedOrderDetails = await response.json();
      setOrders(updatedOrderDetails);

      await fetchTotal();
    } catch (error) {
      console.error("Error removing one item from order:", error);
    }
  };

  if (!showOrders) {
    return (
      <button className="viewOrderDetails" onClick={() => setShowOrders(true)}>
        View Order Details
      </button>
    );
  }

  return (
    <div className="order-details">
      <h3>Order Details:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.order_id}>
            <div className="order-info">
              <span>{order.product_name}</span>
              <span>{order.quantity_ordered}</span>
              <span>${order.subtotal}</span>
            </div>
            <button
              onClick={() => handleClickRemove(order.order_id)}
              id="remove-button"
            >
              -
            </button>
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
