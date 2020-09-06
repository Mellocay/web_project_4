export default class UserInfo {
  constructor(nameSelector, occupationSelector) {
    this._name = document.querySelector(nameSelector);
    this._occupation = document.querySelector(occupationSelector);
  }
  getUserInfo() {
    this._newProfile =  { name: this._name.textContent, occupation: this._occupation.textContent };
    return this._newProfile;
  }
 
  setUserInfo({ profileName, profileDescription }) {
    this._name.textContent = profileName;
    this._occupation.textContent = profileDescription;
  }
}