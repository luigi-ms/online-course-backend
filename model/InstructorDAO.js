const db = require('../connectDatabase.js');
const Instructor = require('./Instructor.js');

class InstructorDAO extends Instructor{
  constructor(){
    super();
  }

  async insert(){
    try{
      const insertionResult = await db.query("INSERT INTO Instructor(name, biography, password) VALUES($1, $2, $3)",
      [this.name, this.bio, this.password]);
      return insertionResult.rows;
    }catch(err){
      return err.stack;
    }
  }

  async selectAllData(){
    try{
      const data = await db.query("SELECT * FROM Instructor WHERE idInstructor=$1",
      [this.id]);
      return data.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectIDAndPass(){
    try{
      const idAndPass = await db.query("SELECT idInstructor, password FROM Instructor WHERE idInstructor=$1",
      [this.id]);
      return idAndPass.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectOwnedCourses(){
    try{
      const courses = await db.query("SELECT ownedCourses FROM Instructor WHERE idInstructor=$1",
      [this.id]);
      return courses.rows[0].ownedcourses;
    }catch(err){
      return err.stack;
    }
  }

  async updateColumn(column, oldValue, newValue){
    let query = "";

    if(!(await this.instructorExists())){
      return 404;
    }

    if(column === "name"){
      query = "UPDATE Instructor SET name=$1 WHERE name=$2 AND idInstructor=$3";
    }else if(column === "bio"){
      query = "UPDATE Instructor SET biography=$1 WHERE biography=$2 AND idInstructor=$3";
    }else if(column === "password"){
      query = "UPDATE Instructor SET password=$1 WHERE password=$2 AND idInstructor=$3";
    }else if(column === "courses"){
      query = "UPDATE Instructor SET ownedCourses=array_replace(ownedCourses, $2, $1) WHERE idInstructor=$3";
    }else{
      return "Column does not exist or you are not allowed to modify it";
    }

    try{
      const updatingResult = await db.query(query, [newValue, oldValue, this.id]);
      return updatingResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteInstructor(){
    if(!(await this.instructorExists())){
      return 404;
    }

    try{
      const deletionResult = await db.query("DELETE FROM Instructor WHERE idInstructor=$1",
      [this.id]);
      return deletionResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async insertNewCourse(courseTitle){
    if(!(await this.instructorExists())){
      return 404;
    }

    try{
      const insertionResult = await db.query("UPDATE Instructor SET ownedCourses=array_append(ownedCourses, $1) WHERE idInstructor=$2",
      [courseTitle, this.id]);
      return insertionResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteOneCourse(courseTitle){
    if(!(await this.instructorExists())){
      return 404;
    }

    try{
      const deletionResult = await db.query("UPDATE Instructor SET ownedCourses=array_remove(ownedCourses, $1) WHERE idInstructor=$2",
      [courseTitle, this.id]);
      return deletionResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async instructorExists(){
   const founded = await this.selectIDAndPass();

    return (founded) ? true : false;
  }
}

module.exports = InstructorDAO;
