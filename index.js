const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// Initial Products Data
let products = [
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual T-Shirts",
    price: 22.3,
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL.png",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Cotton Jacket",
    price: 55.99,
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL.png",
    rating: { rate: 4.7, count: 500 }
  }
];


// first question
app.get("/all", (req, res) => {
  res.json(products);
});


// second question
app.get("/product/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});


// third question
app.post("/product", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct
  });
});

// forth question
app.get("/category/:type", (req, res) => {
  const categoryType = req.params.type.toLowerCase();

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === categoryType
  );

  if (filteredProducts.length === 0) {
    return res.status(404).json({ message: "No products found in this category" });
  }

  res.status(200).json(filteredProducts);
});

// fifth  question
app.post("/products", (req, res) => {

  const newProducts = req.body; 

  if (!Array.isArray(newProducts)) {
    return res.status(400).json({ message: "Send an array of products" });
  }

  newProducts.forEach((product) => {
    product.id = products.length + 1;
    products.push(product);
  });

  res.status(201).json({
    message: "Multiple products added successfully",
    products: newProducts
  });
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});