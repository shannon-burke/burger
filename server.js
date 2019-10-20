var express = require("express");
var PORT = process.env.PORT || 3333;
var app = express();
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use("/", routes);

app.listen(PORT);