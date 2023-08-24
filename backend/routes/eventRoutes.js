const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  getUserEvents,
} = require("../controllers/eventController");

router.get("/", getEvents);

router.get("/:id", getEvent);

router.get("/user/:id", getUserEvents);

router.post("/", createEvent);

router.delete("/:id", deleteEvent);

router.patch("/:id", updateEvent);

module.exports = router;
