const express = require("express");

const router = express.Router();

const {
  createEvent
} = require("../controllers/eventcontroller");

router.post("/events", createEvent);

module.exports = router;