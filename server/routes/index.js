const router = require("express").Router();
const eq = require("./../controller");

router.get("/", (req, res) => { res.send({ response: "Server is up and running." }).status(200); });

router.route("/eq")
    .post(eq.create)
    .get(eq.get)

module.exports = router;