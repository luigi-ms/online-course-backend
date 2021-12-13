const db = require('../connectDatabase.js');
const Student = require('./Student.js');

class StudentRepository extends Student{
  constructor(){
    super();
  }

  async insert(){
    try{
      const result = await db.query("INSERT INTO Student(name, biography, password) VALUES($1, $2, $3)",
      [this.name, this.bio, this.password]);
      return "Insertion done: "+result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectAllData(){
    try{
      const result = await db.query("SELECT * FROM Student WHERE idStudent=$1", [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectIDAndPass(){
    try{
      const result = await db.query("SELECT idStudent, password FROM Student WHERE idStudent=$1", [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectCurrentCourses(){
    try{
      const result = await db.query("SELECT currentCourses FROM Student WHERE idStudent=$1",
      [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async updateColumn(column, newValue){
    let query = "";

    if(column === "name"){
      query = "UPDATE Student SET name=$1 WHERE idStudent=$2";
    }else if(column === "bio"){
      query = "UPDATE Student SET biography=$1 WHERE idStudent=$2";
    }else if(column === "password"){
      query = "UPDATE Student SET password=$1 WHERE idStudent=$2";
    }

    try{
      const result = await db.query(query, [newValue, this.id]);
      return "Updated: "+res.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async updateCoursesArray(changeOnlyEnd, newValue){
    let query = "";

    if(changeOnlyEnd){
      query = "UPDATE Student SET currentCourses=array_append(currentCourses, $1) WHERE idStudent=$2";
    }else{
      query = "UPDATE Student SET currentCourses=$1 WHERE idStudent=$2";
    }

    try{
      const result = await db.query(query, [newValue, this.id]);
      return "Updated: "+result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteStudent(){
    try{
      const result = await db.query("DELETE FROM Student WHERE idStudent=$1", [this.id]);
      return res.rows[0];
    }catch(err){
      return err.stack;
    }
  }
}

module.exports = StudentRepository;
