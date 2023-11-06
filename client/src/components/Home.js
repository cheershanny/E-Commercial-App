import React, { useEffect, useState } from 'react';

const Home = () => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    fetch('/products')
    .then((res) => res.json())
    .then((data) => setProductData(data))
    .catch((err) => console.err("Error fetching product:", err))
  })
  return (
    <div>
      <h1>Something pretty for your home</h1>
      <ul className='product-list'>
        {productData.map((product) => (
          <li key={product.product_id} className="product-item" >
            <span className="product-name">{product.product_name}</span> 
            <span className="product-description">{product.description}</span>
            <span className="product-price">{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
