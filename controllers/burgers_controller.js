var express = require("express");
var router = express.Router();
//var router = express();
var burger = require("../models/burger");

router.get("/", function (req, res) {
    burger.selectAll("burgers", function (data) {
        let burgerObject = {
            burgers: data
        };
        res.render("index", burgerObject);
    });
});

router.post("/createBurger", function (req, res) {
    burger.create(["burger_name", "devoured"],
        [req.body.burger, false],
        function (err, result) {
            if (err) {
                console.log(err)
            }
            console.log("posted");
            res.redirect("/");
        });
});

router.put("/eatDaBurger/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    burger.updateInfo({ devoured: req.body.devoured }, condition, function (result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.redirect("/");
    });
});

module.exports = router;