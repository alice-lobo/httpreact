import React from 'react';
import {useState, useEffect} from "react";
import './App.css';

// 4 - custom hook
import { useFetch } from './hooks/useFetch'; 

const url = "http://localhost:3000/products";

function App() {
  
  const [products, setProducts] = useState([]);

  // 4 - custom hook
  const { data } = useFetch(url);
  console.log(data);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1 - resgatando dados
  /* useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }
    fetchData();
  }, []); */
  

  // 2 - add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };
    console.log(product);

    const res = await fetch(url, {//string em json

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product), 
    });

    // 3 - carregamento dinâmico
    const addedProduct = await res.json(); //transformar em obj jscript
    setProducts((prevProducts) => [...prevProducts, addedProduct])
    
    setName("");
    setPrice("");
  }

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {data && data.map((product) => (
          <li key={product.id}>{product.name} - R$= {product.price}</li>
        ))}
      </ul>
      {/* <ul>
        {data.map((datas) => (
          <li key={datas.id}>{datas.name} - R$= {datas.price}</li>
        ))}
      </ul> */}
      <hr />
      <div className='add-product'>
          <form onSubmit={handleSubmit}>
            <input type="text" value={name} name="name" placeholder='Nome: ' onChange={(e) => setName(e.target.value)} />
            <input type="number" value={price} name="price" placeholder='Valor: ' onChange={(e) => setPrice(e.target.value)} />
            <input type="submit" value="Criar" />
          </form>
      </div>
    </div>
  );
  
}

export default App;
