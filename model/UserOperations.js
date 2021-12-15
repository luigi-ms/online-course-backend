const Student = require('./StudentRepository.js');
const Instructor = require('./InstructorRepository.js');

class UserOperations{
  static async getStudentData(studentId){
    const user = new Student();

    user.id = studentId;

    const data =  await user.selectAllData();

    if(data){
      return Promise.resolve(data);
    }else{
      return Promise.reject(404);
    }
  }

  static updateStudentData(dataType, changeArrayEnd, newValue, studentId){
    const user = new Student();

    user.id = studentId;

    if(dataType === "currentCourses"){
      user.updateCoursesArray(changeArrayEnd, newValue)
        .then(res => console.log("200"))
        .catch(rej => console.error(rej));
    }else{
      user.updateColumn(dataType, newValue)
        .then(res => console.log(res))
        .catch(rej => console.error(rej));
    }
  }

  static async eraseStudentData(studentId){
    const user = new Student();

    user.id = studentId;

    try{
      const deletion = await user.deleteStudent();
      return Promise.resolve(deletion);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async getInstructorData(instructorId){
    const user = new Instructor();

    user.id = instructorId;

    const data = await user.selectAllData();

    if(data){
      return Promise.resolve(data);
    }else{
      return Promise.reject(404);
    }
  }

  static updateInstructorData(dataType, changeArrayEnd, newValue, instructorId){
    const user = new Instructor();

    user.id = instructorId;

    if(dataType === "ownedCourses"){
      user.updateCoursesArray(changeArrayEnd, newValue)
        .then(res => console.log("200"))
        .catch(rej => console.error(rej));
    }else{
      user.updateColumn(dataType, newValue)
        .then(res => console.log(res))
        .catch(rej => console.error(rej));
    }
  }

  static async eraseInstructorData(instructorId){
    const user = new Instructor();

    user.id = instructorId;

    try{
      const deletion = await user.deleteInstructor();
      return Promise.resolve(deletion);
    }catch(err){
      return Promise.reject(err);
    }
  }
}

module.exports = UserOperations;
