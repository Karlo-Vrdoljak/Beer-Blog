const router = require("express").Router();
const [connection, db] = require("../sqlite.js");

router.post("/insert", async (req, res) => {
	db.serialize(() => {
		db.run("INSERT INTO [currency] (symbol,name,symbol_native,decimal_digits,rounding,code,name_plural) values (?,?,?,?,?,?,?)", req.body.symbol, req.body.name, req.body.symbol_native, req.body.decimal_digits, req.body.rounding, req.body.code, req.body.name_plural, function (err) {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
			// todo handle
			db.serialize(() => {
				db.get("select * from currency where pkCurrency = ?", this.lastID, (err, insertedRow) => {
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
		db.all("select * from currency", (err, rows) => {
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
		db.get("select * from currency where pkCurrency = ?", req.query.pkCurrency, (err, row) => {
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
		db.get("select * from currency where pkCurrency = ?", req.body.pkCurrency, (err, row) => {
			if (req.body.symbol) row.symbol = req.body.symbol;
			if (req.body.name) row.name = req.body.name;
			if (req.body.symbol_native) row.symbol_native = req.body.symbol_native;
			if (req.body.decimal_digits) row.decimal_digits = req.body.decimal_digits;
			if (req.body.rounding) row.rounding = req.body.rounding;
			if (req.body.code) row.code = req.body.code;
			if (req.body.name_plural) row.name_plural = req.body.name_plural;
			db.prepare("update currency set symbol = ?, name = ?, symbol_native = ?, decimal_digits = ?, rounding = ?, code = ?, name_plural = ? where pkCurrency = ?", row.symbol, row.name, row.symbol_native, row.decimal_digits, row.rounding, row.code, row.name_plural, row.pkCurrency)
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
		db.run("delete from currency where pkCurrency = ?", req.body.pkCurrency, err => {
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
