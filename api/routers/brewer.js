const router = require("express").Router();
const [connection, db] = require("../sqlite.js");


router.post("/insert", async (req, res) => {
	db.serialize(() => {
		db.run("INSERT INTO [brewer] (pkUser,pkManufacturer) values (?,?)", req.body.pkUser, req.body.pkManufacturer, function (err) {
			if (err) {
				console.error(err);
				res.status(500).send(err);
			}
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            res.send({});
		});
	});
});

module.exports = router;
