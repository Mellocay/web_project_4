export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(".card__item").cloneNode(true);

    this._cardElement = cardElement;
  };

  _setEventListeners() {
    this._cardElement.querySelector(".card__image").addEventListener("click", () => this._handleCardClick());
    
    this._cardElement.querySelector(".button__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("button__like_activated");
    })
    this._cardElement.querySelector(".button__remove").addEventListener("click", (evt) => {
      evt.target.closest(".card__item").remove();
    })
  }

  _handleCardClick() {
    this._image = this._popupElement.querySelector(".popup__image");
    this._caption = this._popupElement.querySelector(".popup__caption");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._caption.textContent = this._name;
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").style.backgroundImage = `url(${this._link})`;
  
    return this._cardElement;
  }
}