export default class UserInfo {
  constructor() {
    this._name = document.querySelector(".profile__name");
    this._occupation = document.querySelector(".profile__occupation");
  }

  getUserInfo() {
    //returns an object with information about the user. 
    this._newProfile = {name: this._name.textContent, occupation: this._occupation.textContent};
  }

  setUserInfo(data) {
    //which takes new user data and adds it on the page.
    this._name.textContent = data.name;
    this._occupation.textContent = data.occupation;
  }
}