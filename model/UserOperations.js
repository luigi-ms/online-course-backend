const Student = require('./StudentRepository.js');
const Instructor = require('./InstructorRepository.js');

class UserOperations{
  static async getStudentData(studentId){
    const user = new Student();

    user.id = studentId;

    return await user.selectAllData();
  }

  static updateStudentData(dataType, changeArrayEnd, newValue, studentId){
    const user = new Student();

    user.id = studentId;

    if(dataType === "currentCourses"){
      user.updateCoursesArray(changeArrayEnd, newValue)
        .then(res => console.log(res))
        .catch(rej => console.error(rej));
    }else{
      user.updateColumn(dataType, newValue)
        .then(res => console.log(res))
        .catch(rej => console.error(rej));
    }
  }

  static eraseStudentData(studentId){
    const user = new Student();

    user.id = studentId;

    user.deleteStudent()
      .then(res => console.log(res))
      .catch(rej => console.error(rej));
  }

  static async getInstructorData(instructorId){
    const user = new Instructor();

    user.id = instructorId;

    return await user.selectAllData();
  }

  static updateInstructorData(dataType, changeArrayEnd, newValue, instructorId){
    const user = new Instructor();

    user.id = instructorId;

    if(dataType === "ownedCourses"){
      user.updateCoursesArray(changeArrayEnd, newValue)
        .then(res => console.log(res))
        .catch(rej => console.error(rej));
    }else{
      user.updateColumn(dataType, newValue)
        .then(res => console.log(res))
        .catch(rej => console.error(rej));
    }
  }

  static eraseInstructorData(instructorId){
    const user = new Instructor();

    user.id = instructorId;

    user.deleteInstructor()
      .then(res => console.log(res))
      .catch(rej => console.error(rej));
  }
}

module.exports = UserOperations;
