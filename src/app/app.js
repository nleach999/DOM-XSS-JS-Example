require('app-module-path').addPath(__dirname);
var express = require('express');
var app = express();

// Examples of modules loading with a relative path and relative to the web root.

var staticOpts = {
  "extensions" : [".js"],
  "index" : ["index.html", "index.js"]
}

// Serves general pages using "/ui" as the web root
app.use(express.static(__dirname + '/ui', staticOpts));



app.listen(3000, function() {
  
});

