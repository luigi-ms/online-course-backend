const Student = require('./StudentDAO.js');
const Instructor = require('./InstructorDAO.js');

class UserActions{
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

  static updateStudentData(dataType, oldValue, newValue, studentId){
    const user = new Student();

    user.id = studentId;

    user.updateColumn(dataType, oldValue, newValue)
      .then(res => console.log(res))
      .catch(rej => console.error(rej));
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

  static updateInstructorData(dataType, oldValue, newValue, instructorId){
    const user = new Instructor();

    user.id = instructorId;

    user.updateColumn(dataType, oldValue, newValue)
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

module.exports = UserActions;
