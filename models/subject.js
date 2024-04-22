const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
});

const Subject = new mongoose.model("Subject", subjectSchema);

module.exports = Subject;
