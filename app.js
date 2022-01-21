const express = require('express');
const app = express();
const AuthRouter = require('./routes/auth.routes');

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('home');
});

// {a} stands for auth
app.use('/a', AuthRouter);

// Server
app.listen(3000, () => {
    console.log('Express app listening on port 3000');
});
