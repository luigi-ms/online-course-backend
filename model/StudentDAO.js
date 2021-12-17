const db = require('../connectDatabase.js');
const Student = require('./Student.js');

class StudentDAO extends Student{
  constructor(){
    super();
  }

  async insert(){
    try{
      const insertionResult = await db.query("INSERT INTO Student(name, biography, password) VALUES($1, $2, $3)",
      [this.name, this.bio, this.password]);
      return insertionResult.rows;
    }catch(err){
      return err.stack;
    }
  }

  async selectAllData(){
    try{
      const data = await db.query("SELECT * FROM Student WHERE idStudent=$1",
      [this.id]);
      return data.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectIDAndPass(){
    try{
      const idAndPassword = await db.query("SELECT idStudent, password FROM Student WHERE idStudent=$1",
      [this.id]);
      return idAndPassword.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectCurrentCourses(){
    try{
      const courses = await db.query("SELECT currentCourses FROM Student WHERE idStudent=$1",
      [this.id]);
      return courses.rows[0].currentcourses;
    }catch(err){
      return err.stack;
    }
  }

  async updateColumn(column, oldValue, newValue){
    let query = "";

    if(!(await this.studentExists())){
      return new Error("This id does not belong to any user");
    }

    if(column === "name"){
      query = "UPDATE Student SET name=$1 WHERE name=$2 AND idStudent=$3";
    }else if(column === "bio"){
      query = "UPDATE Student SET biography=$1 WHERE biography=$2 AND idStudent=$3";
    }else if(column === "password"){
      query = "UPDATE Student SET password=$1 WHERE password=$2 AND idStudent=$3";
    }else if(column === "courses"){
      query = "UPDATE Student SET currentCourses=array_replace(currentCourses, $2, $1) WHERE idStudent=$3";
    }else{
      return "Column does not exists or you are not allowed to modify it";
    }

    try{
      const updatingResult = await db.query(query, [newValue, oldValue, this.id]);
      return updatingResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteStudent(){
    if(!(await this.studentExists())){
      return 404;
    }

    try{
      const deletionResult = await db.query("DELETE FROM Student WHERE idStudent=$1",
      [this.id]);
      return deletionResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async insertNewCourse(newCourse){
    if(!(await this.studentExists())){
      return new Error("This id does not belong to any user");
    }

    try{
      const insertionResult = await db.query("UPDATE Student SET currentCourses=array_append(currentCourses, $1) WHERE idStudent=$2",
      [newCourse, this.id]);

      return insertionResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteOneCourse(courseTitle){
    if(!(await this.studentExists())){
      return new Error("This id does not belong to any user");
    }

    try{
      const deletionResult = await db.query("UPDATE Student SET currentCourses=array_remove(currentCourses, $1) WHERE idStudent=$2",
      [courseTitle, this.id]);
      return deletionResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteCourseFromStudentsList(courseTitle){
    try{
      const bigUpdate = await db.query("UPDATE Student SET currentCourses=array_remove(currentCourses, $1) WHERE $1=ANY(currentCourses)",
      [courseTitle]);

      console.log(bigUpdate);
      return bigUpdate.rows;
    }catch(err){
      return err.stack;
    }
  }

  async studentExists(){
    const founded = await this.selectIDAndPass();

    return (founded) ? true : false;
  }
}

module.exports = StudentDAO;
