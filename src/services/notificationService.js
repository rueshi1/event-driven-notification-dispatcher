const db = require("../db/database");

const createNotification = (event_id, recipient) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO notifications
       (event_id, recipient, channel, status)
       VALUES (?, ?, ?, ?)`,
      [event_id, recipient, "email", "pending"],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};

module.exports = { createNotification };