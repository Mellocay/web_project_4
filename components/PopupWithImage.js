import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this.popupSelector.querySelector(".popup__image");
    this._caption = this._popupSelector.querySelector(".popup__caption");
  }
  console.log(this.popupSelector);
  open(data) {
    this._name = data.name;
    this._link = data.link;
    
    this._image.src = this._link;
    this._caption.textContent = this._name;

    super.open();
  }
}