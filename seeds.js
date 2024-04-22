const mongoose = require("mongoose");
const Student = require("./models/student");

mongoose
  .connect("mongodb://127.0.0.1:27017/studentMarksAdministration")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Error");
  });

const seedStudents = [
  {
    name: "Shivansh",
    batch: 2021,
    regNo: "2021UGCS001",
    sem: 4,
  },
  {
    name: "Krish",
    batch: 2021,
    regNo: "2021UGCS002",
    sem: 4,
  },
  {
    name: "Pratyush",
    batch: 2021,
    regNo: "2021UGCS003",
    sem: 4,
  },
];

Student.insertMany(seedStudents)
  .then((m) => console.log(m))
  .catch((err) => console.log(err));
