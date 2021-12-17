const Course = require('../model/CourseActions.js');
const express = require('express');

const router = express.Router();

router.get('/search-course/:title', (req, res) => {
  const title = req.params.title;

  Course.searchCourse(title)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.status(404).json({ rejected }));
});

router.get('/course/:courseId', (req, res) => {
  const credential = req.params.courseId;

  Course.getCourseData(credential)
    .then(resolved => res.json(resolved))
    .catch(rejected => res.status(404).json({ rejected }));
});

router.post('/student/enroll', (req, res) => {
  const { studentID, courseID } = req.body;

  Course.enrollStudent(studentID, courseID)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.status(404).json({ rejected }));
});

router.post('/student/unenroll', (req, res) => {
  const { studentID, courseTitle } = req.body;

  Course.unenrollStudent(studentID, courseTitle)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.status(404).json({ rejected }));
});

router.post('/new-course', (req, res) => {
  const { title, desc, instructorID } = req.body;

  Course.create(title, desc, instructorID)
    .then(resolved => res.json(resolved))
    .catch(rejected => res.json({ rejected }));
});

router.patch('/update-data/course', (req, res) => {
  const { dataType, newValue, courseID } = req.body;

  Course.updateCourseData(dataType, newValue, courseID)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.delete('/erase/course', (req, res) => {
  const { title, instructorID } = req.body;

  Course.deleteCourse(title, instructorID)
    .then(resolved => res.json(resolved))
    .catch(rejected => res.json({ rejected }));
});

module.exports = router;
