const express = require("express");
const cors = require("cors");
const multer = require("multer");

const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
    dest: "uploads/"
});

app.get("/", (req, res) => {

    res.json({
        project: "Cybersecurity Log Analysis System",
        status: "Running"
    });

});

app.post(
    "/upload-log",
    upload.single("logfile"),
    (req, res) => {

        res.json({
            message: "Log Uploaded Successfully",
            file: req.file.originalname
        });

    }
);

app.post("/add-log", (req, res) => {

    const {
        timestamp,
        source_ip,
        event_type,
        severity
    } = req.body;

    db.run(
        `INSERT INTO logs
        (timestamp,source_ip,event_type,severity)
        VALUES (?,?,?,?)`,
        [
            timestamp,
            source_ip,
            event_type,
            severity
        ],
        function(err) {

            if(err)
            {
                return res.status(500).json(err);
            }

            res.json({
                message: "Log Added"
            });

        }
    );

});

app.get("/logs", (req, res) => {

    db.all(
        "SELECT * FROM logs",
        [],
        (err, rows) => {

            if(err)
            {
                return res.status(500).json(err);
            }

            res.json(rows);

        }
    );

});

app.get("/detect-threats", (req, res) => {

    db.all(
        "SELECT * FROM logs",
        [],
        (err, rows) => {

            if(err)
            {
                return res.status(500).json(err);
            }

            let alerts = [];

            rows.forEach(log => {

                if(log.event_type === "FAILED_LOGIN")
                {
                    alerts.push({
                        ip: log.source_ip,
                        reason: "Failed Login Attempt",
                        severity: "HIGH"
                    });
                }

            });

            res.json(alerts);

        }
    );

});

app.listen(5000, () => {

    console.log("Server running on port 5000");

});