const Course = require('./CourseDAO.js');
const Student = require('./StudentDAO.js');
const Instructor = require('./InstructorDAO.js');

class CourseActions{
  static async enrollStudent(studentId, courseId){
    const course = new Course();
    const student = new Student();

    course.id = courseId;
    student.id = studentId;

    let courseData = await course.selectAllData();

    try{
      const result = await student.insertNewCourse(courseData.title);
      return Promise.resolve(result);
    }catch(err){
      return Promise.reject(err);
    }
  }
  
  static async unenrollStudent(studentId, courseTitle){
    const student = new Student();

    student.id = studentId;

    try{
      const result = await student.deleteOneCourse(courseTitle);
      return Promise.resolve(result);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async searchCourse(courseTitle){
    const course = new Course();

    course.title = courseTitle;

    try{
      const result = await course.searchByTitle();
      return Promise.resolve(result);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async create(title, desc, instructorId){
    const course = new Course();
    const instructor = new Instructor();

    instructor.id = instructorId;
    let data = await instructor.selectAllData();

    course.title = title;
    course.description = desc;
    course.instructorName = data.name;
  
    try{
      const instructorResult = await instructor.insertNewCourse(course.title);
      const courseResult = await course.insert();
      return Promise.resolve({ instructorResult, courseResult });
    }catch(err){
      return Promise.rejected(err);
    }
  }

  static async getCourseData(courseId){
    const course = new Course();

    course.id = courseId;

    try{
      const courseData = await course.selectAllData();
      return Promise.resolve(courseData);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async updateCourseData(dataType, newValue, courseId){
    const course = new Course();

    course.id = courseId;

    try{
      const result = await course.updateColumn(dataType, newValue);
      return Promise.resolve(result);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async deleteCourse(courseTitle, instructorId){
    const course = new Course();
    const instructor = new Instructor();

    course.title = courseTitle;
    instructor.id = instructorId;

    let instructorCourses = await instructor.selectOwnedCourses();
    let courseData = await course.searchByTitle();

    course.id = courseData.idcourse;

    try{
      const instructorResult = await instructor.deleteOneCourse(courseTitle);
      const courseResult = await course.deleteCourse();
      return Promise.resolve({ instructorResult, courseResult });
    }catch(err){
      return Promise.reject(err);
    }
  }
}

module.exports = CourseActions;
