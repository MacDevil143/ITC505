const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const { noun, verb, adjective, adverb, pluralNoun } = req.body;

    if (!noun || !verb || !adjective || !adverb || !pluralNoun) {
        res.send('Please fill out all fields.');
        return;
    }

    const madLib = `The ${adjective} ${noun} ${adverb} ${verb} the ${pluralNoun}.`;

    res.send(`<h2>Your Mad Lib:</h2><p>${madLib}</p>`);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});