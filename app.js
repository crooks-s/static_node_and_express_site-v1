const express = require('express');
const path = require('node:path');
const { projects } = require('./data.json'); 

const app = express();

const publicPath = path.join(__dirname, 'public');

app.use('/static', express.static(publicPath));
app.set('view engine', 'pug');

// Home Page
app.get('/', (req, res, next) => {
    res.locals.projects = projects; 
    res.render('layout');
});

// About Page
app.get('/about', (req, res, next) => {
    res.render('about');
});

// Projects Page, dynamic id
app.get('/projects/:id', (req, res, next) => {
    res.locals.projects = projects;
    const id = req.params.id;
    res.render('project', { id });
});


/**====================
 * Error Handling
 ======================*/

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

/**====================
 * Start Server
 ======================*/
app.listen(3000, () => {
    console.log('Listening on port: 3000');
});