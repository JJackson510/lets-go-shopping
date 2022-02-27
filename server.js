const express = require('express');
const routes = require('./routes');
const sequelize = require('./db/connection');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);



// sync sequelize models to the database, then turn on the server

sequelize.sync({ force: false }).then(() => {
  console.log('Happy Shopping!');
  app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));
});