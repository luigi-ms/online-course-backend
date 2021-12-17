const db = require('../connectDatabase.js');
const Course = require('./Course.js');

class CourseDAO extends Course{
  constructor(){
    super();
  }

  async insert(){
    try{
      const insertionResult = await db.query("INSERT INTO Course(title, description, instructorName) VALUES($1, $2, $3)",
      [this.title, this.description, this.instructorName]);
      return insertionResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectAllData(){
    try{
      const data = await db.query("SELECT * FROM Course WHERE idCourse=$1",
      [this.id]);

      return data.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async updateColumn(column, newValue){
    let query = "";

    if(!(await this.courseExists())){
      return new Error("Course "+this.id+" does not exists");
    }

    if(column === "title"){
      query = "UPDATE Course SET title=$1 WHERE idCourse=$2";
    }else if(column === "description"){
      query = "UPDATE Course SET description=$1 WHERE idCourse=$2";
    }else if(column === "instructorName"){
      query = "UPDATE Course SET instructorName=$1 WHERE idCourse=$2";
    }else{
      return "Column does not exist or you are not alowed to modify it";
    }

    try{
      const updatingResult = await db.query(query, [newValue, this.id]);
      return updatingResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteCourse(){
    if(!(await this.courseExists())){
      return 404;
    }

    try{
      const deletionResult = await db.query("DELETE FROM Course WHERE idCourse=$1",
      [this.id]);
      return deletionResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async searchByTitle(){
    try{
      const searchResult = await db.query("SELECT * FROM Course WHERE title=$1",
      [this.title]);

      return (searchResult.rowCount === 0)
        ? new Error(this.title+" not found")
        : searchResult.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async courseExists(){
    const founded = await this.selectAllData();

    return (founded) ? true : false;
  }
}

module.exports = CourseDAO;
