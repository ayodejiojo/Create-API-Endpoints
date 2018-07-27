import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;


 app.use(express.json());


const database = {

		entries: [{
				title: "heading", message: "message"
		}],

		users: [{
				firstName: "first", lastName: "last", email: "email", password: "password"
		}],

};


app.post('/api/v1/entries', (req, res) =>{
	const { title, message } = req.body;
	if (title === ' ' || message === ' ' ) {
		res.status(422).json('Please fill fields');
	} 
	 else if (title && message) {
		database.entries.push(req.body);
		res.status(201).json(database.entries);
	} 
	else {
		res.status(500).json('System error');
	}
	
});



app.post('/api/v1/signup', (req, res) =>{
	const { firstName, lastName, email, password } = req.body;
	if (firstName === ' ' || lastName === ' ' || email === ' ' || password === ' ') {
		res.status(422).json('Please fill fields');
	} else if (firstName && lastName && email && password) {
		const user = database.users.filter(u => u.email === email && u.password === password);
		if (user.length > 0 && user[0].email) {
			res.status(409).json('Email and password already taken!');
		} else {
			database.users.push(req.body);
			res.status(201).json(database.users);
		}	
	} else {
		res.status(500).json('System error');
	}
	
});

app.post('/api/v1/signin', (req, res)=>{
	if (req.body.email === " " || req.body.password === " "){
		res.status(422).json('Please fill fields');
	}
	else if (req.body.email && req.body.password){
		res.status(200).json('You are signed in');
	} else {
		res.status(500).json('System error');
	}
});


app.put('/api/v1/entries/:id', (req, res) => {
	if (req.body.title === ' ' || req.body.message === ' ') {
		res.status(422).json({ error: 'Please fill the fields!' });
	} else if (!database.entries[req.params.id]) {
		res.status(404).json('No entry found to be modified');
	} else if (req.body.title && req.body.message) {
		database.entries[req.params.id].title = req.body.title;
		database.entries[req.params.id].message = req.body.message;
		res.status(200).json({ message: 'Entry has been updated!' });
	} else {
		res.status(500).json({ error: 'System error' });
	}
});

app.get('/api/v1/entries', (req, res) => {
	 if (database.entries) {
		res.status(200).json(database.entries);
	} else {
		res.status(500).json({ error: 'System error' });
	}
});

app.get('/api/v1/entries/:id', (req, res) => {
	 if (!database.entries[req.params.id]) {
		res.status(404).json('No entry found');
	} else if (database.entries[req.params.id]) {
		res.status(200).json(database.entries[req.params.id]);
	} else {
		res.status(500).json({ error: 'System error' });
	}
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));