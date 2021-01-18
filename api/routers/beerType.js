const router = require("express").Router();
const [connection, db] = require("../sqlite.js");

router.post("/insert", async (req, res) => {
	db.serialize(() => {
		db.run("INSERT INTO [beerType] (color,style,imgUrl) values (?,?,?)", req.body.color, req.body.style, req.body.imgUrl, function (err) {
			if (err) {
				console.error(err);
				res.status(500).send(err);
            }
			// todo handle
			db.serialize(() => {
				db.get("select * from beerType where pkBeerType = ?", this.lastID, (err, insertedRow) => {
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
		db.all("select * from beerType", (err, rows) => {
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
		db.get("select * from beerType where pkBeerType = ?", req.query.pkBeerType, (err, row) => {
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
		db.get("select * from beerType where pkBeerType = ?", req.body.pkBeerType, (err, row) => {
			if (req.body.color) row.color = req.body.color;
			if (req.body.style) row.style = req.body.style;
			if (req.body.imgUrl) row.imgUrl = req.body.imgUrl;
			db.prepare("update beerType set color = ?, style = ?, imgUrl = ? where pkBeerType = ?", row.color, row.style, row.imgUrl, row.pkBeerType)
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
		db.run("delete from beerType where pkBeerType = ?", req.body.pkBeerType, err => {
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
