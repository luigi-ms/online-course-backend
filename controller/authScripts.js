const Auth = require('../model/AuthActions.js');
const express = require('express');

const router = express.Router();

router.post('/signIn/student', (req, res) => {
  const { name, bio, password } = req.body;
  
  Auth.signInStudent(name, bio, password)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.post('/signIn/instructor', (req, res) => {
  const { name, bio, password } = req.body;

  Auth.signInInstructor(name, bio, password)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.post('/login/student', (req, res) => {
  const { studentID, password } = req.body;

  Auth.loginStudent(studentID, password)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.post('/login/instructor', (req, res) => {
  const { instructorID, password } = req.body;
 
  Auth.loginInstructor(instructorID, password)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

module.exports = router;
