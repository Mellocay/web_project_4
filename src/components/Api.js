export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {

  }

  //other methods for working with the API
  getCardList() {
    fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject("Error!" + res.statusText + res.status))
    .catch(err => console.log(err))
  }


}

