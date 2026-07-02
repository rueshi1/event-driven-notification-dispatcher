const fs = require("fs");
const path = require("path");

const db =
require("./db/database");

const app =
require("./app");

const {
 startWorker
} = require("./services/queueWorker");

const schema = fs.readFileSync(
 path.join(
   __dirname,
   "db",
   "schema.sql"
 ),
 "utf8"
);

db.exec(schema);

startWorker();

app.listen(3000, () => {
 console.log(
   "Server running on port 3000"
 );
});