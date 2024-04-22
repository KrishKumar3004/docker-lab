const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },

  marks: {
    type: Map,
    of: Number,
    default: {},
  },
});

const Student = new mongoose.model("Student", studentSchema);

// const student = await Student.findOne({...});
// student.marks.set("os", 30);

// await student.save();

module.exports = Student;
