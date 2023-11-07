import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ productData, user_id }) => {
  const navigate = useNavigate();
  const handleAddProduct = async (product_id, price) => {
    if (user_id === null) {
      alert("please login to add orders");
      navigate("/login");
    } else {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      const orderDetails = {
        user_id: user_id,
        product_id: product_id,
        price: price,
        order_date: formattedDate,
      };

      const response = await fetch(`/add_order/${product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        return data;
      } else {
        console.error("Failed to add product", response);
      }
    }
  };
  return (
    <ul className="product-list">
      {productData.map((product) => (
        <li key={product.product_id} className="product-item">
          <span className="product-name">{product.product_name}</span>
          <span className="product-description">{product.description}</span>
          <span className="product-price">{product.price}</span>
          <button
            onClick={() => handleAddProduct(product.product_id, product.price)}
          >
            Add into order
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Product;
