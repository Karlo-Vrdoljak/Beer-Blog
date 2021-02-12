const router = require("express").Router();
const [connection, db] = require("../sqlite.js");

router.post("/insert", async (req, res) => {
	db.serialize(() => {
		db.run("INSERT INTO [manufacturer] (yearOfEstablishment,pkCountry,description,logoUrl,fbUrl,instagramUrl,pageUrl) values (?,?,?,?,?,?,?)", req.body.yearOfEstablishment, req.body.pkCountry, req.body.description, req.body.logoUrl, req.body.fbUrl, req.body.instagramUrl, req.body.pageUrl, function (err) {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			db.serialize(() => {
				db.get("select * from manufacturer where pkManufacturer = ?", this.lastID, (err, insertedRow) => {
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
		db.all("select * from manufacturer", (err, rows) => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			res.send(rows);
		});
	});
});

router.get("/all/detailed", async (req, res) => {
	let query = '';
	let param = null;
	if(req.query && req.query.pk) {
		query = connection.queryPool.manufacturersBeersDetailed(req.query.pk);
		param = req.query.pk;
		return db.all(query, param, (err, rows) => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			res.send(rows);
		});
	}else {
		query = connection.queryPool.manufacturersDetailed();
		return db.all(query, (err, rows) => {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			res.send(rows);
		});
	}
});


router.get("/one", async (req, res) => {
	db.serialize(() => {
		db.get("select * from manufacturer where pkManufacturer = ?", req.query.pkManufacturer, (err, row) => {
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
		db.get("select * from manufacturer where pkManufacturer = ?", req.body.pkManufacturer, (err, row) => {
			if (req.body.yearOfEstablishment) row.yearOfEstablishment = req.body.yearOfEstablishment;
			if (req.body.pkCountry) row.pkCountry = req.body.pkCountry;
			if (req.body.description) row.description = req.body.description;
			if (req.body.logoUrl) row.logoUrl = req.body.logoUrl;
			if (req.body.fbUrl) row.fbUrl = req.body.fbUrl;
			if (req.body.instagramUrl) row.instagramUrl = req.body.instagramUrl;
			if (req.body.pageUrl) row.pageUrl = req.body.pageUrl;
			db.prepare("update manufacturer set yearOfEstablishment = ?, pkCountry = ?, description = ?, logoUrl = ?, fbUrl = ?, instagramUrl = ?, pageUrl = ? where pkManufacturer = ?", row.yearOfEstablishment, row.pkCountry, row.description, row.logoUrl, row.fbUrl, row.instagramUrl, row.pageUrl, row.pkManufacturer)
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
		db.run("delete from manufacturer where pkManufacturer = ?", req.body.pkManufacturer, err => {
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
