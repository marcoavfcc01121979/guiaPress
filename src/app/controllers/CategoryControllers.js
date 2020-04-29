//const connection = require('../../../database/database')
const Category = require('../models/Category')
const slugify = require('slugify');

module.exports = {
  async store(req, res){
    const {title} = req.body;

    if(title != undefined){
      Category.create({
        title: title,
        slug: slugify(title)
      }).then(() => {
        res.redirect('/admin/categories');
      })
    }else{
      res.redirect('/admin/categories/new');
    }
  },

  async index(req,res){
    Category.findAll().then(categories => {
      res.render('admin/categories/index', {categories: categories});
    });
  },

  async delete(req,res){
    const { id } = req.body;

    if(id != undefined){
      if(!isNaN(id)){  
        Category.destroy({
          where: {
            id: id
          }
        }).then(() => {
          res.redirect('/admin/categories');
        })
      }else{//Nao for um numero
        res.redirect('/admin/categories');
      }
    }else{//Null
      res.redirect('/admin/categories');
    }
  },

  async update(req,res){
    const {id} = req.params;

    if(isNaN(id)){
      res.redirect('/admin/categories');
    }

    Category.findByPk(id).then(categoria => {
      if(categoria != undefined){
        res.render('admin/categories/edit', {categoria: categoria});
      }else {
        res.redirect('/admin/categories')
      }
    }).catch(erro => {
      res.redirect('/admin/categories')
    })
  },

  async update1(req,res){
    const {id,title} = req.body;

    Category.update({title: title, slug: slugify(title)},{
      where: {
        id: id
      }
    }).then(() => {
      res.redirect('/admin/categories');
    })
  }
}