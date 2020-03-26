var express = require("express");

var PORT = 3000;

var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./routes/api"); 

app.use(routes); 

app.listen(PORT, function() {
    console.log("Listening at localhost:" + PORT);
});