class Instructor{
  constructor(){
    this.bio = "";
    this.id = 0;
    this.name = "";
    this.password = "";
    this.ownedCourses = [];
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
  
  get ownedCourses(){
    return this._ownedCourses;
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

  set ownedCourses(newOwnedCourses){
    this._ownedCourses = newOwnedCourses;
  }

  set password(newPassword){
    this._password = newPassword;
  }
}

module.exports = Instructor;
