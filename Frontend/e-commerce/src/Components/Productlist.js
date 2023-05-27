import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error retrieving products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    try {
      const response = await fetch(`http://localhost:5000/search/${key}`);
      const result = await response.json();
      if (result) {
        setProducts(result);
      } else {
        getProducts();
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className='product'>
      <h1>Product List</h1>
      <input type='text' placeholder='Search Item' className='search-input' onChange={searchHandle} />
      <ul>
        <li>sr.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Delete</li>
      </ul>

      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li> $ {item.price}</li>
          <li>{item.category}</li>
          <li>{item.Company}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={"/update/" + item._id}><button type='button'>Update</button></Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Productlist;