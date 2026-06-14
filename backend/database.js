const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("cyberlogs.db", (err) => {

    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite Database");
    }

});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            event TEXT,
            severity TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(`
        INSERT OR IGNORE INTO users
        (
            id,
            username,
            password
        )
        VALUES
        (
            1,
            'admin',
            'admin123'
        )
    `);

});

module.exports = db;