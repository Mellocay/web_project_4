import {fullImage} from "./utils.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".card__item").cloneNode(true);

    return cardTemplate;
  };

  _setEventListeners() {
    const cardImage = this._cardElement.querySelector(".card__image");
    const buttonLike = this._cardElement.querySelector(".button__like");
    const buttonRemove = this._cardElement.querySelector(".button__remove");

    cardImage.addEventListener("click", (data) => this._handleFullImage(data));
    buttonLike.addEventListener("click", this._handleHeartColor);
    buttonRemove.addEventListener("click", this._handleRemoveCard);
  };

  _handleFullImage(this._link, this._name) {
    fullImage(this._link, this._name);
  };

  _handleHeartColor(evt) {
    evt.target.classList.toggle("button__like_activated");
  };

  _handleRemoveCard(evt) {
    evt.target.closest(".card__item").remove();
  };

  generateCard() {
    this._getTemplate();
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__title").textContent = this._name;
  
    this._cardElement.querySelector(".card__image").style.background = `url(${this._link})`;
    this._cardElement.querySelector(".card__image").style.backgroundSize = "cover";
  
      return this._cardElement;
  };
};