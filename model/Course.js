class Course{
  constructor(title, instructorName, description){
    this.title = title;
    this.instructorName = instructorName;
    this.description = description;
    this.id = 0;
  }

  get title(){
    return this._title;
  }

  get instructorName(){
    return this._instructorName;
  }

  get description(){
    return this._description;
  }

  get id(){
    return this._id;
  }

  set description(newDescription){
    this._description = newDescription;
  }

  set title(newTitle){
    this._title = newTitle;
  }

  set instructorName(newInstructorName){
    this._instructorName = newInstructorName;
  }

  set id(newId){
    this._id = newId;
  }
}

module.exports = Course;
