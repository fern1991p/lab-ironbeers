const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars pppartials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((data) => {
    res.render(__dirname + "/views/beers.hbs", {beers: data});

  })
  .catch (()=>{
    console.log("ERROR")
  })
});

app.get('/randombeers', (req, res) => {
  punkAPI.getRandom()
  .then((data) => {
    res.render(__dirname + "/views/randombeers.hbs", {beers: data});
  })
  .catch (()=>{
    console.log("ERROR")
  })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
