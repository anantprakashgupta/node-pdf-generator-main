
var con = require('./connection');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes');
const app = express();
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(homeRoutes.routes);

app.get('/data', function (req, res) {
    con.connect(function (error) {
      if (error) console.log(error);
      var sql = "select * from college";
      con.query(sql, function (error, result) {
        if (error) console.log(error);
        res.render(__dirname + "/views/pk", { Students: result, success: 'show all list' })
      });
    })
  });


app.listen(3000, () => console.log('App is listening on url http://localhost:3000'));