const express = require('express');
const app = express();

const fs = require('fs');
const url = require('url');
const path = require('path');

const bodyParser = require('body-parser');
const moment = require('moment');
const jsonfs = require('jsonfile');

// Get core
const router = require('./server-services/core/router');
const finance = require('./server-services/core/exchange');

/* Redirect views path */
app.set('views', path.join(__dirname, 'client-services/views'));

/* Setting static directory */
app.use(express.static('client-services/css'));
app.use(express.static('client-services/fonts'));
app.use(express.static('client-services/img'));
app.use(express.static('client-services/js'));
app.use(express.static('client-services/lib'));
app.use(express.static('client-services/config'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Setting view engine as EJS file */
app.set('view engine', 'ejs');

const server = require('http').createServer(app);

// Main page here
app.get('/', function(req, res) {
	var lang = '';

	// Parsing the URL
	var params = url.parse(req.url, true);
	if (params.query.lang == undefined) {
		lang = 'en';
	} else {
		lang = params.query.lang;
	}

	// Fetch link support
	var link_supp = jsonfs.readFileSync(__dirname + '/client-services/config/link.json');

	// Fetch language suppout (header.ejs)
	var lang_supp_header = jsonfs.readFileSync(__dirname + '/client-services/lang/' + lang + '/header.json');

	// Fetch language support (content)
	var lang_supp_content = jsonfs.readFileSync(__dirname + '/client-services/lang/' + lang + '/index_content.json');

	// Log: Page start
	console.log('[INFO] index page start.');

	res.render('index', {
		title: 'FIN-LINK, your best choice of FinTech.',
		page_header: lang_supp_header,
		index_content: lang_supp_content,
		link: link_supp
	});
});

// Get other url
app.get('*', function(req,res){
	router.url_handler(req,res);
});

server.listen(process.env.npm_package_config_port, function() {
		var host = server.address().address;
		var port = server.address().port;

		// Log: Server listening
		console.log("[INFO] Server is listening at " + host + ": " + port);
});
