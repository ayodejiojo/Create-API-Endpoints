"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 5000;

app.use(_express2.default.json());

var database = {

	entries: [{
		title: "heading", message: "message"
	}],

	users: [{
		firstname: "first", lastname: "last", email: "email", password: "password"
	}]

};

app.post('/api/v1/entries', function (req, res) {
	var _req$body = req.body,
	    title = _req$body.title,
	    message = _req$body.message;

	if (title === ' ' || message === ' ') {
		res.status(422).json('Please fill fields');
	} else if (title && message) {
		database.entries.push(req.body);
		res.status(201).json(database.entries);
	} else {
		res.status(400).json('Bad Request');
	}
});

app.post('/api/v1/signup', function (req, res) {
	console.log(req.body);
	var _req$body2 = req.body,
	    firstname = _req$body2.firstname,
	    lastname = _req$body2.lastname,
	    email = _req$body2.email,
	    password = _req$body2.password;

	if (firstname === ' ' || lastname === ' ' || email === ' ' || password === ' ') {
		res.json('Please fill fields').status(422);
	} else if (firstname && lastname && email && password) {
		var user = database.users.filter(function (u) {
			return u.email === email && u.password === password;
		});
		if (user.length > 0 && user[0].email) {
			res.status(409).json('Email and password already taken!');
		} else {
			database.users.push(req.body);
			res.status(201).json(database.users);
		}
	} else {
		res.status(400).json('Bad Request');
	}
});

app.post('/api/v1/signin', function (req, res) {
	if (req.body.email === " " || req.body.password === " ") {
		res.status(422).json('Please fill fields');
	} else if (req.body.email && req.body.password) {
		res.status(200).json('You are signed in');
	} else {
		res.status(400).json('Bad Request');
	}
});

app.put('/api/v1/entries/:id', function (req, res) {
	if (req.body.title === ' ' || req.body.message === ' ') {
		res.status(422).json({ error: 'Please fill the fields!' });
	} else if (!database.entries[req.params.id]) {
		res.status(404).json('No entry found to be modified');
	} else if (req.body.title && req.body.message) {
		database.entries[req.params.id].title = req.body.title;
		database.entries[req.params.id].message = req.body.message;
		res.status(200).json({ message: 'Entry has been updated!' });
	} else {
		res.status(400).json({ error: 'Invalid request!' });
	}
});

app.get('/api/v1/entries', function (req, res) {
	if (database.entries) {
		res.status(200).json(database.entries);
	} else {
		res.status(400).json({ error: 'Bad request!' });
	}
});

app.get('/api/v1/entries/:id', function (req, res) {
	if (!database.entries[req.params.id]) {
		res.status(404).json('No entry found');
	} else if (database.entries[req.params.id]) {
		res.status(200).json(database.entries[req.params.id]);
	} else {
		res.status(400).json({ error: 'Bad request!' });
	}
});

app.listen(PORT, function () {
	return console.log("Listening on " + PORT);
});
//# sourceMappingURL=index.js.map
