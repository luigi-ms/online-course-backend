const User = require('../model/UserOperations.js');
const express = require('express');

const router = express.Router();

router.get('/student', (req, res) => {
  const credential = req.query;

  User.getStudentData(credential.id)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.get('/instructor', (req, res) => {
  const credential = req.query;

  User.getInstructorData(credential.id)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.patch('/update-data/student', (req, res) => {
  const data = req.body;

  User.updateStudentData();
});

router.patch('/update-data/instructor', (req, res) => {
  const data = req.body;

  User.updateInstructorData();
});

router.delete('/erase-data/student', (req, res) => {
  const credential = req.body;

  User.eraseStudentData(credential.id)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.delete('/erase-data/instructor', (req, res) => {
  const credential = req.body;

  User.eraseInstructorData(credential.id)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

module.exports = router;
