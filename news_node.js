var axios = require("axios");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var db = mongojs("ricksDB", ['nhl_Collection']);
axios.get("https://www.nhl.com/").then(function(response) {
    //console.log(response);
    var $ = cheerio.load(response.data);
    $("h4.headline-link").each(function(i, element){
        var heading = $(element).text();
        console.log(heading);
        var link = $(element).parent().attr("href");
        console.log(link);
        var mongoDocument = {
            "heading": heading,
            "link" : link
        };
        console.log("i", i);
        console.log("mongoDocument", mongoDocument);
        db.nhl_Collection.insert(
            mongoDocument,
            {w:1},
            function(err, doc){
                console.log("ERROR", err);
                console.log("DOC", doc);
            }
        );
    });
    console.log("DONE");
});