import { popupImage, popupCaption } from "../Utils/constants";
import{ imagePopup } from "../pages/index.js"

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
    return this._cardElement;
  };

  _setEventListeners() {
    this._cardElement.querySelector(".card__image").addEventListener("click", () => {
      this._handleCardClick({link: this._link, name: this._name});
    })
    this._cardElement.querySelector(".button__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("button__like_activated");
    })
    this._cardElement.querySelector(".button__remove").addEventListener("click", (evt) => {
      evt.target.closest(".card__item").remove();
    })
  }

  this._handleCardClick() {
    imagePopup.open();
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__image").style.backgroundImage = `url(${this._link})`;
  
    return this._cardElement;
  }
}