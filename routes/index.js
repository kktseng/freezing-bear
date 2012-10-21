module.exports = function(app, basePath) {
  basePath = basePath || '/';

  app.get(basePath, function(req, res) {
    res.render('index');
  });

}