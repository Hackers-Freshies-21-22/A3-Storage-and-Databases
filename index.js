const express = require('express');

const { processUpdate } = require('./bot');

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello from the Bot API.' });
});

app.post(`/`, (req, res) => {
    processUpdate(req.body);
	res.status(200).json({ message: 'ok' });
});

app.listen(port, () => {
	console.log(`\n\nServer running on port ${port}.\n\n`);
});