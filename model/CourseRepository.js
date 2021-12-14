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
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async selectAllData(){
    try{
      const result = await db.query("SELECT * FROM Course WHERE idCourse=$1",
      [this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async updateColumn(column, newValue){
    let query = "";

    const data = await this.selectAllData();

    if(!data){
      return "404";
    }

    if(column === "title"){
      query = "UPDATE Course SET title=$1 WHERE idCourse=$2";
    }else if(column === "description"){
      query = "UPDATE Course SET description=$1 WHERE idCourse=$2";
    }else{
      return "Column does not exist or you are not alowed to modify it";
    }

    try{
      const result = await db.query(query, [newValue, this.id]);
      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }

  async deleteCourse(){
    const data = this.selectAllData();

    if(!data){
      return "404";
    }

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

      return result.rows[0];
    }catch(err){
      return err.stack;
    }
  }
}

module.exports = CourseRepository;
