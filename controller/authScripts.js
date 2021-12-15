const Auth = require('../model/AuthActions.js');
const express = require('express');

const router = express.Router();

router.post('/signIn/student', (req, res) => {
  const data = req.body;
  
  Auth.signInStudent(data.name, data.bio, data.password)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));

});

router.post('/signIn/instructor', (req, res) => {
  const data = req.body;

  Auth.signInInstructor(data.name, data.bio, data.password)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));

});

router.post('/login/student', (req, res) => {
  const credentials = req.body;
  Auth.loginStudent(credentials.id, credentials.password)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

router.post('/login/instructor', (req, res) => {
  const credentials = req.body;
  Auth.loginInstructor(credentials.id, credentials.password)
    .then(resolved => res.json({ resolved }))
    .catch(rejected => res.json({ rejected }));
});

module.exports = router;
