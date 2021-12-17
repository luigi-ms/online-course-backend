const Student = require('./StudentDAO.js');
const Instructor = require('./InstructorDAO.js');

class AuthActions{
  static async signInStudent(name, bio, password){
    const student = new Student();

    student.name = name;
    student.bio = bio;
    student.password = password;

    try{
      const insertion = await student.insert();
      return Promise.resolve(insertion);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async signInInstructor(name, bio, password){
    const instructor = new Instructor();

    instructor.name = name;
    instructor.bio = bio;
    instructor.password = password;

    try{
      const insertion = await instructor.insert();
      return Promise.resolve(insertion);
    }catch(err){
      return Promise.reject(err);
    }
  }

  static async loginStudent(id, password){
    const student = new Student();

    student.id = id;
    student.password = password;
  
    const data = await student.selectIDAndPass();
      
    if(data.idstudent === id && data.password === password){//Se o id e a password existirem na tabela Student
      return Promise.resolve("Access allowed");
    }else{
      return Promise.reject("Access denied");
    }
  }

  static async loginInstructor(id, password){
    const instructor = new Instructor();

    instructor.id = id;
    instructor.password = password;

    const data = await instructor.selectIDAndPass();

    if(data.idinstructor === id && data.password === password){ //Se o id e a password existirem na tabela Instructor
      return Promise.resolve("Access allowed");
    }else{
      return Promise.reject("Acess denied");
    }
  }
}

module.exports = AuthActions;
