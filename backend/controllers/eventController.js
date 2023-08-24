const Event = require("../models/eventModel");
const mongoose = require("mongoose");

// get events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.status(200).json({ events });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

// get single event
const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(404).json({ error: "No such event" });
  }
  const event = await Event.findById(id);

  if (!event) {
    return res.status(400).json({ Error: "No such event" });
  }
  res.status(200).json({ event });
};

// get events
const getUserEvents = async (req, res) => {
  const { id } = req.params;
  try {
    const events = await Event.find({ createdBy: id });
    res.status(200).json({ events });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

// post event
const createEvent = async (req, res) => {
  const { title, description, location, date, time, createdBy } = req.body;

  // add doc to db
  try {
    const event = await Event.create({
      title,
      description,
      location,
      date,
      time,
      createdBy,
    });
    res.status(200).json({ event });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

// delete an event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(404).json({ error: "No such event" });
  }

  const event = await Event.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(400).json({ Error: "No such event" });
  }
  res.status(200).json({ event });
};

// update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(404).json({ error: "No such event" });
  }

  const event = await Event.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!event) {
    return res.status(400).json({ Error: "No such event" });
  }
  res.status(200).json({ event });
};

module.exports = {
  getEvents,
  getEvent,
  getUserEvents,
  createEvent,
  deleteEvent,
  updateEvent,
};
