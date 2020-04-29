const Article = require('../models/Article');
const Category = require('../models/Category');
const slugify = require('slugify');

module.exports = {
  async index(req,res){
    await Category.findAll().then(categories => {
      res.render('admin/articles/new',{categories: categories})
    })
  },

  async store(req,res) {
    const { title, body, category } = req.body;

    await Article.create({
      title: title,
      slug: slugify(title),
      body: body,
      categoryId: category
    }).then(() => {
      res.redirect('/admin/articles');
    });
  },

  async mostrar(req,res) {
    Article.findAll({
      include: [{ model: Category }]
    }).then(articles => {
      res.render('admin/articles/index', {articles: articles});
    });
  },

  async delete(req,res){
    const { id } = req.body;

    if(id != undefined){
      if(!isNaN(id)){  
        Article.destroy({
          where: {
            id: id
          }
        }).then(() => {
          res.redirect('/admin/articles');
        })
      }else{//Nao for um numero
        res.redirect('/admin/articles');
      }
    }else{//Null
      res.redirect('/admin/articles');
    }
  },

  async home(req,res){
    Article.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then((articles) => {
      Category.findAll().then(categories => {
        res.render('index', {articles: articles, categories: categories});
      });
    });
  },
  async indexHome(req,res){
    const { slug } = req.params;
    Article.findOne({
      where: {
        slug: slug
      }
    }).then(article => {
      if(article != undefined){
        Category.findAll().then(categories => {
          res.render('article', {article: article, categories: categories});
        });
      }else {
        res.redirect('/');
      }
    }).catch( err => {
      res.redirect('/');
    })
  },
  async indexHomeCategory(req,res){
    const { slug } = req.params;
    Category.findOne({
      where: {
        slug: slug
      },
      include: [{ model: Article }]
    }).then(category => {
      if(category !== undefined){
        Category.findAll().then(categories => {
          res.render('index', { articles: category.articles, categories: categories })
        })
      }else{
        res.redirect('/');
      }
    }).catch( err => {
      res.redirect('/');
    })
  }
}