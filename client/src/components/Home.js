import React, { useEffect, useState } from "react";
import Product from "./Product/Product";

const Home = ({ user_id }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setProductData(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, []);
  return (
    <div>
      <h1>Something pretty for your home</h1>
      <Product productData={productData} user_id={user_id} />
    </div>
  );
};

export default Home;
