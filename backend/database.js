const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./logs.db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            source_ip TEXT,
            event_type TEXT,
            severity TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_ip TEXT,
            reason TEXT,
            severity TEXT
        )
    `);

});

module.exports = db;