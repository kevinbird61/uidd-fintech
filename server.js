const express = require('express');
const app = express();

const fs = require('fs');
const url = require('url');
const path = require('path');

const bodyParser = require('body-parser');
const moment = require('moment');
const jsonfs = require('jsonfile');
const IO = require('socket.io');

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
app.use(express.static('client-services/plugin'));
app.use(express.static('client-services/config'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Setting view engine as EJS file */
app.set('view engine', 'ejs');

const server = require('http').createServer(app);
const io = new IO().listen(server);

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

// Socket io here
io.sockets.on('connection',function(socket){
	socket.on('finance',function(data){
		var country1 = data.country1,country2 = data.country2;
		console.log("Country 1: " + data.country1 + "; Country 2:" + data.country2);
		finance.getExchangeAsync(data.country1,data.country2,function(err,detail){
			if(err == 0){
				socket.emit('error','server finance error');
			}
			else{
				var obj = {
					c1: data.country1,
					c2: data.country2,
					rate : detail
				}
				socket.emit('exchange',obj);
			}
		});
	});
});

server.listen(process.env.npm_package_config_port, function() {
		var host = server.address().address;
		var port = server.address().port;

		// Log: Server listening
		console.log("[INFO] Server is listening at " + host + ": " + port);
});
