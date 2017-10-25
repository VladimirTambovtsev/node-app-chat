const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname, '../public') // just go to public directory
const port = process.env.PORT || 3000; // Heroku or Localhost deployemnt

var app = express();

app.use(express.static(publicPath)); // add index static files 

 
app.listen(port, () => {
	console.log(`Server is up on ${port}`);
});