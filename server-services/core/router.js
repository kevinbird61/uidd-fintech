/* Dealing with functional url */
var handler = require('./urlHandler');

var mapping = [];
// Header services
mapping['/header_intro'] = handler.intro;
mapping['/header_founders'] = handler.founders;
mapping['/header_partnership'] = handler.partnership;
mapping['/finance'] = handler.finance;
// io services

function url_handler(req,res){
    /* Map req.url to correspond function */
    if(typeof mapping[req.url] === 'function'){
        /* legal */
        mapping[req.url](req,res);
    }
    else {
        /* illegal url */
        res.writeHead(404,{"Content-Type": "text/plain"});
        res.end("404 not found , url = " + req.url);
    }
}

exports.url_handler = url_handler;
