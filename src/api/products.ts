{/* import axios from "axios";

const API_BASE = 'http://localhost:8000';

export const addProduct = async (data:any) => {
    return await axios.post(`${API_BASE}/api/products`, data);
};

export const getProducts = async () => {
    return await axios.get(`${API_BASE}/api/products`);
};
*/}

const API_BASE = 'http://localhost:8000';

const handleAdd = async () => {
    try {
      //const result = await addProduct({name:"Shoes", price:100});
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Product 2",
          sku: "24221",
          price: 20000,
          category: "Headsets"
        })
      })
  
      const result = await response.json() 
      console.log("Product added:", result)
    } catch (error) {
      console.error("Error adding product:", error);
    }
};

const fetchProducts = () => {
    fetch("http://localhost:8000/api/products")
      .then(response => response.json())
          .then(data => {
            const products = data
            console.log(data)    
          })
          .catch(error => console.error("Error fetching data: ", error));
};

export {
    handleAdd,
    fetchProducts
}