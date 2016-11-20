var express = require('express')
var app = express()
var mass = [];
 
var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "*******",
      secret: "******"
    };

app.set('view engine', 'ejs');
app.get('/',function (req, res){
    res.end("Welcome")
})

app.get('/*',function (req, res) { 
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        flickr.photos.search({
            tags : String(req.url).split("/")[1],
            page: String(req.url).split("/")[2],
            per_page: 10
        }, function(err, result) {
            for(var i in result['photos']['photo']){
            mass.push("https://c1.staticflickr.com/"
            +result['photos']['photo'][i]["farm"]
            +"/"+result['photos']['photo'][i]["server"]
            +"/"+result['photos']['photo'][i]["id"]
            +"_"+result['photos']['photo'][i]["secret"]
            +"_b.jpg")}
           
            res.render('search',
        	{photos:mass});
        	mass = []
        });
    });
})




    app.listen(process.env.PORT || 8080,function(){
      console.log("Started 8080")
    })
