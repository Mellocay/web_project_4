export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick }, userId, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = userId;
    this._owner = data.owner;
    this._like = data.likes;
    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardClick = handleCardClick;
  };

  id() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".card__item").cloneNode(true);

    this._cardElement = cardElement;
  };

  _setEventListeners() {
    const deleteCardButton = this._cardElement.querySelector('.button__remove');
    if (this._owner._id !== this._userId) {
      deleteCardButton.style.display = 'none';
    }
    
    this._cardElement.querySelector(".card__image").addEventListener("click", () => { 
      this._handleCardClick({
        name: this._name, 
        link: this._link
      })
    });
    this._cardElement.querySelector(".button__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("button__like_activated");
    })
    this._cardElement.querySelector(".button__remove").addEventListener("click", () => this._handleDeleteClick(this._id()));
  //   this._cardElement.querySelector(".button__remove").addEventListener("click", (evt) => {
  //     evt.target.closest(".card__item").remove();
  //   })
    
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").style.backgroundImage = `url(${this._link})`;
  
    return this._cardElement;
  }
}