const Sequelize = require('sequelize');
const connection = require('../../../database/database');
const Category = require('./Category');

const Article = connection.define('articles',{
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Category.hasMany(Article); //Uma Categoria tem muitas artigos. 1 - P - M => hasMany
Article.belongsTo(Category); //Um Artigo pertence a uma categoria. 1 - P -1 => belongsTo()

//Article.sync({force: true});
module.exports = Article;