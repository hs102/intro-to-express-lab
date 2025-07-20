const express = require('express');
const app = express();
const PORT = 3001;

// Data arrays
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// 1. Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});

// 2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
  const numberParam = req.params.number;
  const number = parseInt(numberParam);
  
  // Check if the parameter is not a number
  if (isNaN(number)) {
    res.send('You must specify a number.');
    return;
  }
  
  // Generate random number between 0 and the given number
  const rolledNumber = Math.floor(Math.random() * (number + 1));
  res.send(`You rolled a ${rolledNumber}.`);
});

// 3. I Want that one
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);
  
  // Check if index is valid
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    res.send('This item is not yet in stock. Check back soon!');
    return;
  }
  
  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

// 4. Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
  let filteredShoes = [...shoes]; // Start with a copy of all shoes
  
  // Filter by min-price
  if (req.query['min-price']) {
    const minPrice = parseFloat(req.query['min-price']);
    if (!isNaN(minPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
  }
  
  // Filter by max-price
  if (req.query['max-price']) {
    const maxPrice = parseFloat(req.query['max-price']);
    if (!isNaN(maxPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
  }
  
  // Filter by type
  if (req.query.type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === req.query.type);
  }
  
  res.json(filteredShoes);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});