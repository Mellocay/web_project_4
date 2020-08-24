import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }
  
  open(data) {
    this._image = this._popupElement.querySelector(".popup__image");
    this._caption = this._popupElement.querySelector(".popup__caption");
    this._name = data.name;
    this._link = data.link;
    
    this._image.src = this._link;
    this._caption.textContent = this._name;

    super.open();
  }
}