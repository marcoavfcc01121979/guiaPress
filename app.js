const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const connection = require('./database/database')
const Article = require('./src/app/models/Article');
const Category = require('./src/app/models/Category');

class App{
  constructor(){
    this.index = express();

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.index.use(express.json());
    this.index.set('view engine', 'ejs');
    this.index.use(bodyParser.urlencoded({extended: false}));
    this.index.use(bodyParser.json());
    this.index.use(express.static('public'));
  }

  routes(){
    this.index.use(routes);
  }
}

module.exports = new App().index;