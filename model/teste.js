const course = require('./CourseOperations.js');

course.deleteCourse("Impressionismo", 2)
  .then(res => console.log(res))
  .catch(rej => console.log(rej));
