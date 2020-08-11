const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const products = [];
const cart = [];

app.get("/products", (request, response) => {
  return response.json(products);
});

app.post("/products", (request, response) => {
  const { title, value } = request.body;

  const product = { 
    id: uuid(), 
    title, 
    value,
  }

  products.push(product);

  return response.json(product);
});

app.post("/products/cart", (request, response) => {
  const { title, value } = request.body;

  const product = {
    id: uuid(), 
    title, 
    value
  }

  cart.push(product);

  return response.json(product);
});

app.delete("/products/cart/:id", (request, response) => {
  const { id } = request.params;

  const productIndex = cart.findIndex(product => product.id === id);

  if (productIndex === -1) {
    return response.status(400).send();
  } 

  cart.splice(productIndex, 1);
  
  return response.status(204).send();
});

app.get("/products/cart", (request, response) => {
  return response.json(cart);
});

app.put("/products/:id", (request, response) => {
  const { id } = request.params;
  const { title, value } = request.body;

  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1)
    return response.status(400).send();

  const product = {
    ...products[productIndex],
    title,
    value, 
  }

  products[productIndex] = product;


  return response.json(products[productIndex]);
});

app.delete("/products/:id", (request, response) => {
  const { id } = request.params;

  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) {
    return response.status(400).send();
  } 

  products.splice(productIndex, 1);
  
  return response.status(204).send();
});



module.exports = app;
