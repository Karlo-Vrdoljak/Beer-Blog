const router = require("express").Router();
const [connection, db] = require("../sqlite.js");

router.post("/insert", async (req, res) => {
	db.serialize(() => {
		db.run("INSERT INTO [beer] (price,pkCurrency,alcoholPerc,pkBeerType,pkManufacturer,name,imageUrl) values (?,?,?,?,?,?,?)", req.body.price, req.body.pkCurrency, req.body.alcoholPerc, req.body.pkBeerType, req.body.pkManufacturer, req.body.name, req.body.imageUrl, function (err) {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			db.serialize(() => {
				db.get("select * from beer where pkBeer = ?", this.lastID, (err, insertedRow) => {
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
		db.all("select * from beer", (err, rows) => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			res.send(rows);
		});
	});
});

router.get('/all/detailed', async (req, res) => {
	console.log(req.originalUrl, req.query.pkUser);
	if(req.query && req.query.pkUser) {
		const query = connection.queryPool.allBeersDetailedForUser();
		db.serialize(() => {
			db.all(query, req.query.pkUser, (err, rows) => {
				if (err) {
					console.error(err);
					res.status(500).send(err);
				}
				// todo handle
				res.send(rows);
			});
		});
	} else {
		const query = connection.queryPool.allBeersDetailed();
		db.serialize(() => {
			db.all(query, (err, rows) => {
				if (err) {
					console.error(err);
					res.status(500).send(err);
				}
				// todo handle
				res.send(rows);
			});
		});
	}
});

router.get('/one/detailed', async (req, res) => {
	if(req.query.pk) {
		const query = connection.queryPool.oneBeerDetailed();
		db.serialize(() => {
			db.get(query, req.query.pk, (err, row) => {
				if (err) {
					console.error(err);
					res.status(500).send(err);
				}
				// todo handle
				res.send(row);
			});
		});
	}
});


router.get("/one", async (req, res) => {
	db.serialize(() => {
		db.get("select * from beer where pkBeer = ?", req.query.pkBeer, (err, row) => {
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
		db.get("select * from beer where pkBeer = ?", req.body.pkBeer, (err, row) => {
			if (req.body.price) row.price = req.body.price;
			if (req.body.pkCurrency) row.pkCurrency = req.body.pkCurrency;
			if (req.body.alcoholPerc) row.alcoholPerc = req.body.alcoholPerc;
			if (req.body.pkBeerType) row.pkBeerType = parseInt(req.body.pkBeerType);
			if (req.body.pkManufacturer) row.pkManufacturer = parseInt(req.body.pkManufacturer);
			if (req.body.name) row.name = req.body.name;
			if (req.body.imageUrl) row.imageUrl = req.body.imageUrl;
			console.log(row);
			db.prepare("update beer set price = ?, pkCurrency = ?, alcoholPerc = ?, pkBeerType = ?, pkManufacturer = ?, name = ?, imageUrl = ? where pkBeer = ?", row.price, row.pkCurrency, row.alcoholPerc, row.pkBeerType, row.pkManufacturer, row.name, row.imageUrl, row.pkBeer)
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
		db.run("delete from beer where pkBeer = ?", req.body.pk, err => {
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
