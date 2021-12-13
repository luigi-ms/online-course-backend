const Course = require('./CourseRepository');
const Student = require('./StudentRepository.js');
const Instructor = require('./InstructorRepository.js');

class CourseOperations{
  static async enrollStudent(studentId, courseId){
    const course = new Course();
    const student = new Student();

    course.id = courseId;
    student.id = studentId;

    let courseData = await course.selectAllData();

    student.updateCourseArray(true, courseData.title)
      .then(res => console.log(res))
      .catch(rej => console.error(rej));
  }
  
  static async unenrollStudent(studentId, courseTitle){
    const student = new Student();

    student.id = studentId;

    let studentCourses = student.selectCurrentCourses();

    studentCourses = studentCourses.filter(course => {
      return course !== courseTitle;
    });

    student.updateCoursesArray(false, studentCourses)
      .then(res => console.log(res))
      .catch(rej => console.error(rej));
  }

  static async searchCourse(courseTitle){
    const course = new Course();

    course.title = courseTitle;

    return await course.searchByTitle();
  }

  static async create(title, desc, instructorId){
    const course = new Course();
    const instructor = new Instructor();

    instructor.id = instructorId;
    let data = await instructor.selectAllData();

    course.title = title;
    course.description = desc;
    course.instructorName = data.instructorName;

    course.insert()
      .then(res => console.log(res))
      .catch(rej => console.error(rej));

    instructor.updateOwnedCourses(true, title).
      .then(res => console.log(res))
      .catch(rej => console.error(rej));
  }

  static updateCourseData(dataType, newValue, courseId){
    const course = new Course();

    course.id = courseId;

    course.updateColumn(dataType, newValue)
      .then(res => console.log(res))
      .catch(rej => console.error(rej));
  }

  static async deleteCourse(courseTitle, instructorId){
    const course = new Course();
    const instructor = new Instructor();

    course.id = courseId;
    instructor.id = instructorId;

    let instructorCourses = await instructor.selectOwnedCourses();

    instructorCourses = instructorCourses.filter(course => {
      return course !== courseTitle;
    });

    instructor.updateCoursesArray(false, instructorCourses)
      .then(res => console.log(res))
      .catch(rej => console.error(rej));

    course.deleteCourse()
      .then(res => console.log(res))
      .catch(rej => console.error(rej));
  }
}

module.exports = CourseOperations;
