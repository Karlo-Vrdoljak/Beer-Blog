const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./beer.db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const expressJwt = require('express-jwt');
const SECRET_KEY = "c7ec74f3-2e9c-458d-add4-b7e37384d92e";

const connection = {
	useJwtMiddleware: function () {
		return expressJwt({secret: SECRET_KEY, algorithms: ['HS256']}).unless({
				path: ["/security/logoff", "/security/login", "/security/register", new RegExp('\/[a-zA-Z]+\/all'), new RegExp('\/[a-zA-Z]+\/one')]
			})
	},
	dbSetup: {
		createUsersIfNotExists: () => {
			return new Promise((resolve, reject) => {
				db.serialize(() => {
					db.prepare(`CREATE TABLE IF NOT EXISTS user(pkUser INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, isAdmin INT NULL, email VARCHAR NULL, isActive INT NOT NULL)`).run().finalize();
					db.all(`SELECT * from user limit 1`, async (err, rows) => {
						if (!rows.length) {
							[
								{ username: "admin", password: "admin", isAdmin: 1, email: "admin@gmail.com", isActive: 1 },
								{ username: "user", password: "user", isAdmin: 0, email: "user@gmail.com", isActive: 1 },
							].forEach(async u => {
								const pass = await bcrypt.hash(u.password, saltRounds);
								db.prepare(`INSERT INTO user (username, password, isAdmin, email, isActive) VALUES (?, ?, ?, ?, ?)`, u.username, pass, u.isAdmin, u.email, u.isActive)
									.run()
									.finalize(err => {
										if (err) {
											reject(err);
										} else {
											resolve(true);
										}
									});
							});
						}
					});
				});
			});
		},
		insertTableWithDefaults: table => {
			return new Promise((resolve, reject) => {
				const [tableCreateQuery, insertQuery] = fs.readFileSync(`./sql/${table}.sql`).toString().trim().split(";");
				db.serialize(() => {
					db.prepare(tableCreateQuery).run().finalize();
					db.all(`SELECT * from ${table} limit 1`, async (err, rows) => {
						if (!rows.length) {
							db.prepare(insertQuery)
								.run()
								.finalize(err => {
									if (err) {
										reject(err);
									} else {
										resolve(true);
									}
								});
						} else {
							resolve(true);
						}
					});
				});
			});
		},
	},
	init: function () {
		db.serialize(() => {
			db.exec("PRAGMA foreign_keys = ON;", function (error) {
				if (error) {
					console.error("Pragma statement didn't work.");
				} else {
					console.log("Foreign Key Enforcement is on.");
				}
			});
		});
		this.dbSetup.createUsersIfNotExists().catch(err => {
			console.log("err", err);
		});
		Promise.all(["country", "currency", "beerType"].map(table => this.dbSetup.insertTableWithDefaults(table))).then(results => {
			if (results.every(r => r == true)) this.dbSetup.insertTableWithDefaults("manufacturer").then(result => {
					if (result) this.dbSetup.insertTableWithDefaults("beer");
				});
		});

		return this;
	},
	getTokenFromHeader: authHeader => {
		if (authHeader == null) {
			return;
		}
		return authHeader.split("Bearer ")[1];
	},
	getUserByUsername: username => {
		return new Promise((resolve, reject) => {
			db.get(`SELECT * from user u where u.username = ?`, username, (err, row) => {
				if (err) {
					reject(err);
				}
				resolve(row);
			});
		});
	},
	getAllUsers: () => {
		return new Promise((resolve, reject) => {
			db.all(`SELECT * from user`, (err, rows) => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
		});
	},
	userLogin: user => {
		return new Promise(async (resolve, reject) => {
			try {
				let dbUser = await connection.getUserByUsername(user.username);
				resolve(await bcrypt.compare(user.password, dbUser.password));
			} catch (error) {
				reject(error);
			}
		});
	},
	createToken: data => {
		const TWELVE_HOURS = Math.floor(Date.now() / 1000) + 60 * 60 * 12; // 30;
		return jwt.sign({ exp: TWELVE_HOURS, data: data }, SECRET_KEY, {algorithm: 'HS256'});
	},
	extractToken: token => {
		let auth = null;
		try {
			auth = jwt.verify(token, SECRET_KEY);
		} catch (error) {
			console.error(`${error.name} at ${new Date().toJSON()}\nfor token: ${token}`);
			return null;
		}
		return auth;
	},
	insertUser: user => {
		return new Promise(async (resolve, reject) => {
			const pass = await bcrypt.hash(user.password, saltRounds);
			db.prepare(`INSERT INTO user (username, password, isAdmin, email, isActive) VALUES (?, ?, ?, ?, ?)`, user.username, pass, user.isAdmin, user.email, user.isActive)
				.run()
				.finalize(err => {
					err ? reject(err) : resolve();
				});
		});
	},
};
module.exports = [connection.init(), db];
