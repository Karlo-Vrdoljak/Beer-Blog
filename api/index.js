const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 3350;
const localDB = require('./db.js');
const cors = require('cors');
const connection = require('./sqlite.js');

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {

    let auth = connection.extractToken(connection.getTokenFromHeader(req.headers.authorization || null));
    // console.log(req.headers);
    if((auth && auth.data && auth.data.isActive) || (auth && auth.data && auth.data.isAdmin)) {
        res.auth = auth.data;
        next();
    } else if (connection.checkWhiteList(req.originalUrl)){
        next();
    } else {
        console.log(auth);
        res.status(401).send({code: 401});
    }
});

app.get('/manufacturer/', (req, res) => {
    console.log(res.auth);
    res.send(localDB.manufacturers.map(m => {
        return {
            label: m.label,
            pkManufacturer: m.pkManufacturer,
        }
    }));
});

app.get('/manufacturer/:pkManufacturer/', (req, res) => {
    res.send(localDB.manufacturers.find(m => m.pkManufacturer == req.params.pkManufacturer));
});

app.get('/part/:pkPart/', (req, res) => {
    res.send(localDB.parts.find(i => i.pkPart == req.params.pkPart));
});

app.post('/login', async (req, res) => {
    console.log(req.body);
    let throwLogin = (err = null) => res.status(500).send({err: err || 'Invalid login data'});
    connection.getUserByUsername(req.body && req.body.username).then(async (user) => {
        console.log(user);
        if(user && user.id) {
            try {
                if((req.body && req.body.username) && (req.body && req.body.password)) {
                    let loginResult = await connection.userLogin(req.body);
                    if (loginResult == false) {
                        return throwLogin();
                    } 
                    let token = connection.createToken({ user: { username: user.username, id: user.id } });
                    res.send({
                        // user: user,
                        valid: loginResult,
                        token: token
                    });
                } else {
                    throwLogin();
                }
            } catch (err) {
                throwLogin(err);
            }
        } else {
            throwLogin();
        }
    }).catch((err) => {
        throwLogin(err);
    });
});

app.post('/register', async (req, res) => {
    let throwErr = (err = null) => res.status(500).send({err: err || 'Invalid registration data'});
    if((req.body && req.body.username) && (req.body && req.body.password)) {
        let user = await connection.getUserByUsername(req.body.username)
        if(user && user.id) {
            return throwErr('User already exists');
        }
        connection.insertUser(req.body).then(async () => {
            let resultUser = await connection.getUserByUsername(req.body.username)
            res.status(201).send(resultUser);
        }).catch(err => throwErr(err));
    } else {
        throwErr();
    } 
});

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

app.post('/checkAuth', async (req, res) => {
    res.send(res.auth);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})