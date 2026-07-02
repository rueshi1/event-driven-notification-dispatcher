const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./notifications.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("SQLite Connected");
  }
});

module.exports = db;