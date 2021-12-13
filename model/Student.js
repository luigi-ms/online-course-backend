class Student {
  constructor(){
    this.bio = "";
    this.id = 0;
    this.name = "";
    this.currentCourses = [];
    this.password = "";
  }

  get bio(){
    return this._bio;
  }

  get id(){
     return this._id;
  }
  
  get name(){
    return this._name;
  }

  get currentCourses(){
    return this._currentCourses;
  }

  get password(){
    return this._password;
  } 

  set bio(newBio){
    this._bio = newBio;
  }

  set name(newName){
    this._name = newName;
  }

  set id(newId){
    this._id = newId;
  }

  set currentCourses(newCurrentCourses){
    this._currentCourses = newCurrentCourses;
  }

  set password(newPassword){
    this._password = newPassword;
  }
}

module.exports = Student;
