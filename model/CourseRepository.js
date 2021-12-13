const db = require('../connectDatabase.js');
const Course = require('./Course.js');

class CourseRepository extends Course{
  constructor(){
    super();
  }

  async insert(){
    try{
      const result = await db.query("INSERT INTO Course(title, description, instructorName) VALUES($1, $2, $3)",
      [this.title, this.description, this.instructorName]);
      return res.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectAllData(){
    try{
      const result = await db.query("SELECT * FROM Course WHERE idCourse=$1",
      [this.id]);
      return res.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async updateColumn(column, newValue){
    let query = "";

    if(column === "title"){
      query = "UPDATE Course SET title=$1 WHERE idCourse=$2";
    }else if(column === "description"){
      query = "UPDATE Course SET description=$1 WHERE idCourse=$2";
    }

    try{
      const result = await db.query(query, [newValue, this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteCourse(){
    try{
      const result = await db.query("DELETE FROM Course WHERE idCourse=$1",
      [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async searchByTitle(){
    try{
      const result = await db.query("SELECT * FROM Course WHERE title=$1",
        [this.title]);
      return res.rows[0];
    }catch(err){
      return err.stack;
    }
  }
}

module.exports = CourseRepository;
