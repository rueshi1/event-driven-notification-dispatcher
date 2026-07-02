const db = require("../db/database");

const queue = [];

const addToQueue = (task) => {
  queue.push(task);
};

const startWorker = () => {
  setInterval(() => {

    if (queue.length === 0) {
      return;
    }

    const task = queue.shift();

    const delay =
      Math.floor(Math.random() * 500) + 500;

    setTimeout(() => {

      const failed = Math.random() < 0.1;

      if (failed) {

        db.run(
          `UPDATE notifications
           SET status='failed',
               retry_count=retry_count+1,
               updated_at=CURRENT_TIMESTAMP
           WHERE id=?`,
          [task.notification_id]
        );

        console.log(
          `Notification ${task.notification_id} Failed`
        );

      } else {

        db.run(
          `UPDATE notifications
           SET status='completed',
               updated_at=CURRENT_TIMESTAMP
           WHERE id=?`,
          [task.notification_id]
        );

        console.log(
          `Notification ${task.notification_id} Completed`
        );
      }

    }, delay);

  }, 1000);
};

module.exports = {
  addToQueue,
  startWorker,
};
