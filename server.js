const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.listen(3000, () => {
  console.log('Jimmie Vale server kör på http://localhost:3000');
});