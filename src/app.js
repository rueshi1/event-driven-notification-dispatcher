const express = require("express");

const eventRoutes =
require("./routes/eventRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1", eventRoutes);

module.exports = app;
