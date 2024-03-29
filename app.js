const express = require('express');
const path = require('node:path');
const { projects } = require('./data.json'); 

const app = express();

const publicPath = path.join(__dirname, 'public');

app.use('/static', express.static(publicPath));
app.set('view engine', 'pug');

// Set port number
const port = process.env.PORT || 3000;

// Home Page
app.get('/', (req, res, next) => {
    res.locals.projects = projects; 
    res.render('index');
});

// About Page
app.get('/about', (req, res, next) => {
    res.render('about');
});

// Projects Page, dynamic id
app.get('/projects/:id', (req, res, next) => {
    res.locals.projects = projects;
    const id = req.params.id;
    if (!id || parseInt(id) < 0 || parseInt(id) >= projects.length) {
        next();
    }
    res.render('project', { id });
});


/**====================
 * Error Handling
 ======================*/

app.use((req, res, next) => {
    const err = new Error('Attempted to access an unavailable web page');
    err.status = 404;
    next(err);
});

app.use( (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.render('page-not-found', { err, statusCode });
});

/**====================
 * Start Server
 ======================*/
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});