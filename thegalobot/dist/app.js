// Create express app
var express = require("express");
var app = express();
var db = require("./database.js");
var md5 = require("md5");
const cors = require("cors")

var corsOptions = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOptions));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/gifts", (req, res, next) => {
    let sql = `SELECT * FROM gifts WHERE id NOT IN (SELECT gift_id AS id FROM user WHERE gift_id IS NOT NULL) ORDER BY desc`;
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }

        res.json({
            rows
        });
    });
});

app.get("/api/user", (req, res, next) => {
    let sql = `SELECT user.id, user.username, gifts.desc
    FROM user
    INNER JOIN gifts ON user.gift_id = gifts.id`;
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

        res.json({
            rows
        });
    });
});

app.post("/api/user", (req, res, next) => {
    var errors = [];
    if (!req.body.username) {
        errors.push("No name specified");
    }
    if (errors.length) {
        res.status(400).json({"error":errors.join(", ")});
        return;
    }
    var data = {
        username: req.body.username,
        giftId: req.body.giftId
    };
    var sql = 'INSERT INTO user (username, gift_id) VALUES (?,?)'
    var params = [data.username, data.giftId];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        });
    });
});

app.delete("/api/user/:id", (req, res, next) => {
    db.run(`DELETE FROM user WHERE id = ?`,
    req.params.id,
    function (err, result) {
        if (err) {
            res.status(400).json({"error":res.message});
            return;
        }
        
        res.json({})
        //res.json({
        //    "message": "success"
        //});
    });
});

app.post("/api/login", (req,res,next) => {
    var data = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    var sql = `SELECT 1 FROM user WHERE username = ? AND password = ?`
    var params = [data.username, data.password]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

        if (!rows.length > 0) {
            res.status(422).json({"error":"Usuário ou senha inválidos."});
            return;
        }

        res.json({
            "message": "success"
        });
    });
})

app.post("/api/gifts", (req,res,next) => {
    var data = {
        desc: req.body.desc
    }

    var sql = `INSERT INTO gifts (desc) VALUES (?)`
    var params = [data.desc]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }

        res.json({
            "message": "success"
        });
    });
})

app.delete("/api/gifts/:id", (req, res, next) => {
    db.run(`DELETE FROM gifts WHERE id = ?`,
    req.params.id,
    function (err, result) {
        if (err) {
            res.status(400).json({"error":res.message});
            return;
        }
        
        res.json({})
    });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});