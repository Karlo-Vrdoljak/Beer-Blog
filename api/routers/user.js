const router = require("express").Router();
const [connection, db] = require("../sqlite.js");

router.post("/insert", async (req, res) => {
	db.serialize(() => {
		db.run("INSERT INTO [user] (username,password,isAdmin,email,isActive) values (?,?,?,?,?)", req.body.username, req.body.password, req.body.isAdmin, req.body.email, req.body.isActive, function (err) {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			db.serialize(() => {
				db.get("select * from user where pkUser = ?", this.lastID, (err, insertedRow) => {
					if (err) {
						console.error(err);
						res.status(500).send(err);
					}
					// todo handle
					res.send(insertedRow);
				});
			});
		});
	});
});

router.get("/all", async (req, res) => {
	db.serialize(() => {
		db.all("select * from user", (err, rows) => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			res.send(rows);
		});
	});
});

router.get("/one", async (req, res) => {
	db.serialize(() => {
		db.get("select * from user where pkUser = ?", req.query.pkUser, (err, row) => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			res.send(row);
		});
	});
});

router.put("/update", async (req, res) => {
	db.serialize(() => {
		db.get("select * from user where pkUser = ?", req.body.pkUser, (err, row) => {
			if (req.body.username) row.username = req.body.username;
			if (req.body.password) row.password = req.body.password;
			if (req.body.isAdmin) row.isAdmin = req.body.isAdmin;
			if (req.body.email) row.email = req.body.email;
			if (req.body.isActive) row.isActive = req.body.isActive;
			db.prepare("update user set username = ?, password = ?, isAdmin = ?, email = ?, isActive = ? where pkUser = ?", row.username, row.password, row.isAdmin, row.email, row.isActive, row.pkUser)
				.run()
				.finalize(err => {
					if (err) {
						console.error(err);
						res.status(500).send(err);
					}
					// todo handle
					res.send(row);
				});
		});
	});
});

router.delete("/delete", async (req, res) => {
	db.serialize(() => {
		db.run("delete from user where pkUser = ?", req.body.pkUser, err => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			res.send({ status: "OK" });
		});
	});
});

module.exports = router;
