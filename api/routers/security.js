const router = require("express").Router();
const [connection, db] =  require('../sqlite.js');

router.post("/login", async (req, res) => {
	console.log(req.body);
	let throwLogin = (err = null) => res.status(500).send({ err: err || "Invalid login data" });
	connection
		.getUserByUsername(req.body && req.body.username)
		.then(async user => {
			console.log(user);
			if (user && user.pkUser) {
				try {
					if (req.body && req.body.username && req.body && req.body.password) {
						let loginResult = await connection.userLogin(req.body);
						if (loginResult == false || user.isActive == 0) {
							return throwLogin();
						}
						let token = connection.createToken({ username: user.username, pkUser: user.pkUser, email: user.email, isAdmin: user.isAdmin, isActive: user.isActive });
						res.send({
							// user: user,
							valid: loginResult,
							token: token,
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
		})
		.catch(err => {
			throwLogin(err);
		});
});

router.post("/register", async (req, res) => {
	let throwErr = (err = null) => res.status(500).send({ err: err || "Invalid registration data" });
	if (req.body && req.body.username && req.body && req.body.password) {
		let user = await connection.getUserByUsername(req.body.username);
		if (user && user.pkUser) {
			return throwErr("User already exists");
		}
		connection
			.insertUser(req.body)
			.then(async () => {
				let resultUser = await connection.getUserByUsername(req.body.username);
				db.run("INSERT INTO [brewer] (pkUser,pkManufacturer) values (?,?)", resultUser.pkUser, req.body.pkManufacturer, function (err) {
					if (err) {
						console.error(err);
					}
				});
				res.status(201).send(resultUser);
			})
			.catch(err => throwErr(err));
	} else {
		throwErr();
	}
});
router.post("/checkAuth", async (req, res) => {
	res.send(req.user);
});

module.exports = router;
