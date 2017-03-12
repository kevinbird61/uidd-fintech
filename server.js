const express = require('express');
const app = express();
const fs = require('fs');
const url = require('url');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
const jsfs = require('jsonfile');

/* Redirect views path */
app.set('views',path.join(__dirname,'client-services/views'));
/* Setting static directory - image use */
app.use(express.static('client-services/css'));
app.use(express.static('client-services/data'));
app.use(express.static('client-services/fonts'));
app.use(express.static('client-services/img'));
app.use(express.static('client-services/js'));
app.use(express.static('client-services/lib'));
app.use(express.static('client-services/plugin'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
/* Setting view engine as ejs */
app.set('view engine','ejs');

const server = require('http').createServer(app);

app.get("/",function(req,res){
    var lang = "";
    var params = url.parse(req.url , true);
    if(params.query.lang == undefined){
        lang = "zh_TW";
    }
    else{
        lang = params.query.lang;
    }
    // Fetch language support (in header.ejs)
    var lang_support_header = jsfs.readFileSync(__dirname+'/client-services/translation/'+lang+'/header.json');
    // Fetch Language support (text support)
    var lang_support_text = jsfs.readFileSync(__dirname+'/client-services/translation/'+lang+'/index_content.json');

    console.log("[uidd-fintech] Index page start!");
    res.render('index',{
        title: "FIN-LINK, your best choice of fintech.",
        page_header: lang_support_header,
        index_content: lang_support_text
    });
});

server.listen(process.env.npm_package_config_portiorender, function(){
    var host = server.address().address;
    var port = server.address().port;
    // logger.record('io.render',"[io.render] Example app listening at "+host+" : "+port);
    console.log("[uidd-fintech] uidd-fintech server listening at "+host+" : "+port);
});
