const db = require("../model");

module.exports = {
    create: function (req, res) {
        db.create({
            user: req.body.user,
            text: req.body.text,
        }).then(dbModel => res.json(dbModel)).catch(err => res.status(422).json(err));
    },
    get: function (req, res) {
        db.find({}).then(eq => {
            res.json(eq)
        }).catch(err => res.status(422).json(err));
    }
}