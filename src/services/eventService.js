const db = require("../db/database");

const saveEvent = (event_type, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO events(event_type,payload)
       VALUES (?, ?)`,
      [event_type, JSON.stringify(data)],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

module.exports = { saveEvent };