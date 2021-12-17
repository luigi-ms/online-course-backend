const Course = require('./CourseDAO.js');
const Student = require('./StudentDAO.js');
const Instructor = require('./InstructorDAO.js');

class CourseActions{
  static async enrollStudent(studentId, courseId){
    const course = new Course();
    const student = new Student();

    course.id = courseId;
    student.id = studentId;

    const courseData = await course.selectAllData();

    if(!courseData){
      return Promise.reject("This id does not belong to any course");
    }

    try{
      const enrollment = await student.insertNewCourse(courseData.title);

      return (enrollment instanceof Error)
        ? Promise.reject(enrollment.message)
        : Promise.resolve(enrollment);
    }catch(err){
      return Promise.reject(err);
    }
  }
  
  static async unenrollStudent(studentId, courseTitle){
    const student = new Student();

    student.id = studentId;

    try{
      const unenrollment = await student.deleteOneCourse(courseTitle);
      return (unenrollment instanceof Error)
        ? Promise.reject(unenrollment.message)
        : Promise.resolve(unenrollment);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async searchCourse(courseTitle){
    const course = new Course();

    course.title = courseTitle;

    try{
      const searchResult = await course.searchByTitle();

      return (searchResult instanceof Error)
        ? Promise.reject(searchResult.message)
        : Promise.resolve(searchResult);
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
      const courseInsertion = await instructor.insertNewCourse(course.title);
      const courseCreation = await course.insert();
      return Promise.resolve({ courseInsertion, courseCreation });
    }catch(err){
      return Promise.rejected(err);
    }
  }

  static async getCourseData(courseId){
    const course = new Course();

    course.id = courseId;

    try{
      const courseData = await course.selectAllData();

      return (courseData) 
        ? Promise.resolve(courseData)
        : Promise.reject("This id does not belong to any course");
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async updateCourseData(dataType, newValue, courseId){
    const course = new Course();

    course.id = courseId;

    try{
      const updating = await course.updateColumn(dataType, newValue);
      return Promise.resolve(updating);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async deleteCourse(courseTitle, instructorId){
    const course = new Course();
    const instructor = new Instructor();
    const student = new Student();

    course.title = courseTitle;
    instructor.id = instructorId;

    const instructorCourses = await instructor.selectOwnedCourses();
    const courseData = await course.searchByTitle();

    course.id = courseData.idcourse;

    try{
      const listsUpdating = await student.deleteCourseFromStudentsList(courseTitle);
      const courseRemoving = await instructor.deleteOneCourse(courseTitle);
      const courseDeletion = await course.deleteCourse();
      return Promise.resolve({ listUpdating, courseRemoving, courseDeletion });
    }catch(err){
      return Promise.reject(err);
    }
  }
}

module.exports = CourseActions;
