var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {
    // Let's scrape Anchorman 2
    var loc = req.query.place;
    url = 'http://www.bbc.com/travel/'+loc;
    console.log(url);
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var name, title, picture, content;
            var json = { location: "", title: "", image: "" , summary: ""};

           $('#main-content').filter(function(){
                var entries = $(".entry");
               $('.entry').each(function(index, value){
                   json.location = loc;
                   json.title = $(this).find('h2 a').first().text();
                   json.image =   $(this).find(".image-container a img").attr("src");
                   json.summary = $(this).find(".summary").text().trim();
                   fs.appendFile('output.json', JSON.stringify(json, null, 4));
               });
               console.log("The file is ready!");
            });
        } else {
            console.log(error.message);
        }
        res.send('Check your console!')
    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app; 	