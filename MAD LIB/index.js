const express = require('express');
const path = require('path'); // Include the path module
const app = express();

app.use(express.urlencoded({ extended: true }));

// Serve index.html at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Your existing route for /cs212/homework/8
app.get('/cs212/homework/8', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Your POST route for /cs212/homework/8
app.post('/cs212/homework/8', (req, res) => {
    const { adjective, pluralNoun, personName, verb, noun } = req.body;
    const madLib = `This evening, I stumbled upon a ${adjective} cluster of ${pluralNoun} reminiscent of ${personName}. As a result, I decided to ${verb} close to the ${noun}.`;

    res.send(MAD LIB);
});

module.exports = app;
