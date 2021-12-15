const Course = require('../model/CourseOperations.js');
const express = require('express');

const router = express.Router();

router.get('/search-course');

router.post('/student/enroll');

router.post('/student/unenroll');

router.post('/new-course');

router.patch('/update-data/course');

router.delete('/erase-data/course');

module.exports = router;
