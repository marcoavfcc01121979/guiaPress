const {Router} = require('express');
const CategoryController = require('./src/app/controllers/CategoryControllers')
const ArticleControllers = require('./src/app/controllers/ArtigoControllers')
const routes = new Router();


routes.get('/admin/categories/new', (req,res) => {
  res.render('admin/categories/new');
});

//Categorias
routes.post('/categories/save', CategoryController.store);
routes.get('/admin/categories/', CategoryController.index);
routes.post('/categories/delete', CategoryController.delete);
routes.get('/admin/categories/edit/:id', CategoryController.update);
routes.post('/categories/update', CategoryController.update1);

//Article
routes.get('/', ArticleControllers.home);
routes.get('/:slug', ArticleControllers.indexHome);
routes.get('/category/:slug', ArticleControllers.indexHomeCategory);
routes.get('/admin/articles/new', ArticleControllers.index);
routes.get('/admin/articles', ArticleControllers.mostrar);
routes.post('/articles/save', ArticleControllers.store);
routes.post('/articles/delete', ArticleControllers.delete);


module.exports = routes;