export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRes(res) {
    return (res.ok ? res.json() : Promise.reject("Error!" + res.statusText + res.status));
    console.log("checked");
  }

  //other methods for working with the API
  getCardList() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers
    })
    .then(res => this._checkRes(res))
    .catch(err => console.log(err))
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers
    })
    .then(res => this._checkRes(res))
    .catch(err => console.log(err))
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()])
  }

  
  addCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link
      }),
    })
    .then(res => this._checkRes(res))
    .catch(err => console.log(err))
  }

    // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    removeCard(cardID) { }

    // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    changeLikeCardStatus(cardID, like) {
      
     }

  // PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: res.name,
        about: res.about
      }),
    })
    .then(res => this._checkRes(res))
    .catch(err => console.log(err))
  }

    // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    setUserAvatar({ avatar }) { }





}
