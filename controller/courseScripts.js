const Course = require('../model/CourseActions.js');
const express = require('express');

const router = express.Router();

router.get('/search-course', (req, res) => {
  const title = req.query.title;

  Course.searchCourse(title)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.get('/course', (req, res) => {
  const credential = req.query.courseID;

  Course.getCourseData(credential)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.post('/student/enroll', (req, res) => {
  const credentials = req.body;

  Course.enrollStudent(crendentials.studentID, credentials.courseID)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.post('/student/unenroll', (req, res) => {
  const data = req.body;

  Course.unenrollStudent(data.studentID, data.courseTitle)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.post('/new-course', (req, res) => {
  const data = req.body;

  Course.create(data.title, data.desc, data.instructorId)
    .then(resolved => res.json(resolved))
    .catch(rejected => res.json({ rejected }));
});

router.patch('/update-data/course', (req, res) => {
  const data = req.body;

  Course.updateCourseData(data.dataType, data.newValue)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.delete('/erase-data/course', (req, res) => {
  const data = req.body;

  Course.deleteCourse(data.title, data.instructorId)
    .then(resolved => res.json(resolved))
    .catch(rejected => res.json({ rejected }));
});

module.exports = router;
