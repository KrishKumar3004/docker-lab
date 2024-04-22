const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Student = require("./models/student");
const methodOverride = require("method-override");
const Subject = require("./models/subject");

mongoose.connect('mongodb://admin:password@localhost:27017/', {

})
  .then(() => {
    console.log('Mongo Connection Open');
  })
  .catch((err) => {
    console.error('Mongo Error:', err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/********************************************************************* */

// route to show the list of every student
app.get("/students", async (req, res) => {
  const students = await Student.find({});
  const subjects = await Subject.find();
  res.render("students/index", { students, subjects });
});

// route to get the request to add new student
app.get("/students/new", (req, res) => {
  res.render("students/new");
});

// route to get the complete details of a student
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  const subjects = await Subject.find();
  res.render("students/show", { student, subjects });
});

// route to push the record into database
app.post("/students", async (req, res) => {
  console.log(req.body);
  const newStudent = new Student(req.body);
  await newStudent.save();
  console.log(newStudent);
  res.redirect(`/students/${newStudent._id}`);
});

// route to get the edit request
app.get("/students/:id/edit", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  res.render("students/edit", { student });
});

// route to add the marks of a new subject
app.put("/students/subject/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  console.log("Working");
  const student = await Student.findById(id);

  student.marks.set(req.body.subject, req.body.marks);
  console.log("After This");
  console.log(student.marks.get(req.body.subject));
  // const editedStudent = await Student.marks.set(
  //   "req.body.subject",
  //   req.body.marks
  // );
  student
    .save()
    .then((m) => console.log(m))
    .catch((err) => console.log(err));

  res.redirect(`/students/${student._id}`);
});

// route to edit the record in the database
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const editedStudent = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.redirect(`/students/${editedStudent._id}`);
});

// route to delete the record in the database
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.redirect("/students");
});

/********************************************************************* */

// route to show the list of every subject
app.get("/subjects", async (req, res) => {
  const subjects = await Subject.find({});
  res.render("subjects/index", { subjects });
});

// route to get the request to add new subject
app.get("/subjects/new", (req, res) => {
  res.render("subjects/new");
});

// route to push the record into database
app.post("/subjects", async (req, res) => {
  console.log(req.body);
  const newSubject = new Subject(req.body);
  await newSubject.save();
  console.log(newSubject);
  res.redirect(`/subjects`);
});

// route to delete the record in the database
app.delete("/subjects/:id", async (req, res) => {
  const { id } = req.params;
  await Subject.findByIdAndDelete(id);
  res.redirect("/subjects");
});
/*************************************************************************** */
const PORT = process.env.PORT || "8081";
app.listen(+PORT, () => {
  console.log("On port 8081");
});
