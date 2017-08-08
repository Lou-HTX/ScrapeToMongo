const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scrapetomongo');
const db = mongoose.connection;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + 'public'));

const routes = require('./routes');
for (let route in routes) {
    app.use(route, routes[route]);
}

db.on('error', (error) => {
    console.log(error);
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

