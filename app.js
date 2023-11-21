const express = require('express');
const { projects } = require('./data.json'); 

const app = express();

app.use('/static', express.static('public'));

// Home Page
app.get('/', (req, res, next) => {
    res.locals.projects = projects;
    res.send('<h1>HOME PAGE</h1>');
});

app.get('/about', (req, res, next) => {
    // res.render();
    res.send('<h1>ABOUT</h2>');

});

app.get('/projects/:id', (req, res, next) => {
    // res.render();
    res.send('<h1>PROJECTS</h2>');
});



app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use('/noroute', (err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

// Start server
app.listen(3000, () => {
    console.log('Listening on port: 3000');
});