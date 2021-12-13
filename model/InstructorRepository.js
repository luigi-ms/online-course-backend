const db = require('../connectDatabase.js');
const Instructor = require('./Instructor.js');

class InstructorRepository extends Instructor{
  constructor(){
    super();
  }

  async insert(){
    try{
      const result = await db.query("INSERT INTO Instructor(name, biography, password) VALUES($1, $2, $3)",
      [this.name, this.bio, this.password]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectAllData(){
    try{
      const result = await db.query("SELECT * FROM Instructor WHERE idInstructor=$1",
      [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectIDAndPass(){
    try{
      const result = await db.query("SELECT idInstructor, password FROM Instructor WHERE idInstructor=$1",
      [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectOwnedCourses(){
    try{
      const result = await db.query("SELECT ownedCourses FROM Instructor WHERE idInstructor=$1",
      [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async updateColumn(column, newValue){
    let query = "";

    if(column === "name"){
      query = "UPDATE Instructor SET name=$1 WHERE idInstructor=$2";
    }else if(column === "bio"){
      query = "UPDATE Instructor SET biography=$1 WHERE idInstructor=$2";
    }else if(column === "password"){
      query = "UPDATE Instructor SET password=$1 WHERE idInstructor=$2";
    }

    try{
      const result = await db.query(query, [newValue, this.id]);
      return res.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async updateOwnedCourses(changeOnlyEnd, newValue){
    let query = "";

    if(changeOnlyEnd){
      query = "UPDATE Instructor SET ownedCourses=array_append(ownedCourses, $1) WHERE idInstructor=$2";
    }else{
      query = "UPDATE Instructor SET ownedCourses=$1 WHERE idInstructor=$2";
    }

    try{
      const result = await db.query(query, [newValue, this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteInstructor(){
    try{
      const result = await db.query("DELETE FROM Instructor WHERE idInstructor=$1",
      [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }
}

module.exports = InstructorRepository;
