const Student = require('./StudentDAO.js');
const Instructor = require('./InstructorDAO.js');

class UserActions{
  static async getStudentData(studentId){
    const user = new Student();

    user.id = studentId;

    const data =  await user.selectAllData();

    return (data) 
      ? Promise.resolve(data) 
      : Promise.reject("This id does not belong to any user");
  }

  static async updateStudentData(dataType, oldValue, newValue, studentId){
    const user = new Student();

    user.id = studentId;

    try{
      const updated = await user.updateColumn(dataType, oldValue, newValue);
      return Promise.resolve(updated);
    }catch(err){
      return Promise.reject(err);
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

    return (data) 
      ? Promise.resolve(data) 
      : Promise.reject("This id does not belong to any user");
  }

  static async updateInstructorData(dataType, oldValue, newValue, instructorId){
    const user = new Instructor();

    user.id = instructorId;

    try{
      const updated = await user.updateColumn(dataType, oldValue, newValue);
      return Promise.resolve(updated);
    }catch(err){
      return Promise.reject(err);
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
