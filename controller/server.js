const express = require('express');
const authRouter = require('./authScripts.js');
const userRouter = require('./userScripts.js');
const courseRouter = require('./courseScripts.js');

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(courseRouter);

app.listen(5000, () => {
  console.log("Express running on port 5000")
}); 
