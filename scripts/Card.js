import {togglePopup, fullImage} from "./utils.js";

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

  _handleFullImage(data) {
    const popupFullImage = document.querySelector(".popup_type_image");
    const popupImage = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");
    popupImage.src = data._link;
    popupImage.alt = data._name;
    popupCaption.textContent = data._name;
    togglePopup(popupFullImage);
    const popupBackgroundImage = popupFullImage.querySelector(".popup__background");
    popupBackgroundImage.addEventListener("click", function() {
      if (popupFullImage.classList.contains("popup_active")) {
        togglePopup(popupFullImage);
      }
    })
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