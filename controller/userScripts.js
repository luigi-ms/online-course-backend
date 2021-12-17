const User = require('../model/UserActions.js');
const express = require('express');

const router = express.Router();

router.get('/student/:studentId', (req, res) => {
  const credential = req.params.studentId;

  User.getStudentData(credential)
    .then(resolved => res.json(resolved))
    .catch(rejected => res.status(404).json({ rejected }));
});

router.get('/instructor/:instructorId', (req, res) => {
  const credential = req.params.instructorId;

  User.getInstructorData(credential)
    .then(resolved => res.json(resolved))
    .catch(rejected => res.status(404).json({ rejected }));
});

router.patch('/update-data/student', (req, res) => {
  const { dataType, oldValue, newValue, studentID } = req.body;

  User.updateStudentData(dataType, oldValue, newValue, studentID)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.patch('/update-data/instructor', (req, res) => {
  const { dataType, oldValue, newValue, instructorID } = req.body;

  User.updateInstructorData(dataType, oldValue, newValue, instructorID)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.delete('/erase/student', (req, res) => {
  const { studentID } = req.body;

  User.eraseStudentData(studentID)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.delete('/erase/instructor', (req, res) => {
  const { instructorID } = req.body;

  User.eraseInstructorData(instructorID)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

module.exports = router;
