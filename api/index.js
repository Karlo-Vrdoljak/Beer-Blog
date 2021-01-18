const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3350;
const cors = require('cors');
const [connection, db] = require('./sqlite.js');

app.use(cors());
app.use(bodyParser.json());

app.use(connection.useJwtMiddleware());

app.use('/beer', require('./routers/beer'));
app.use('/beerType', require('./routers/beerType'));
app.use('/manufacturer', require('./routers/manufacturer'));
app.use('/user', require('./routers/user'));


app.use('/security', require('./routers/security'));

app.get('/test', (req, res) => {
    res.send('server alive!');
})

app.get('/users', (req, res) => {
    connection.getAllUsers().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({err: err || 'Cannot fetch users'});
    });
})

app.post('/regtest', async (req, res) => {
    console.log(req.body);
    let user = await connection.getUserByUsername(req.body.username);
    res.status(201).send(user);

})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})