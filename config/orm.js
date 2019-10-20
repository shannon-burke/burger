var connection = require("./connection.js");

function questionMarks(number) {
    var array = [];
    for (var i = 0; i < number; i++) {
        array.push("?");
    }
    return array.toString();
}

function sendObjectToSql(object) {
    var array = [];
    for (var key in object) {
        var value = object[key];
        array.push(key + "=" + value);
    }
    return array.toString();
}
var orm = {
    selectAll: function (table, cb) {
        var stringQuery = "SELECT * FROM ??";
        console.log(stringQuery);
        connection.query(stringQuery, [table], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        var stringQuery = "INSERT INTO " + table;

        stringQuery += " (";
        stringQuery += cols.toString();
        stringQuery += ") VALUES (";
        stringQuery += questionMarks(vals.length);
        stringQuery += ") ";

        console.log(stringQuery);

        connection.query(stringQuery, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateInfo: function (table, objColVals, condition, cb) {
        var stringQuery = "UPDATE " + table;

        stringQuery += " SET ";
        stringQuery += sendObjectToSql(objColVals);
        stringQuery += " WHERE ";
        stringQuery += condition;

        console.log(stringQuery);
        connection.query(stringQuery, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
}

module.exports = orm;