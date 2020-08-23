import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }
  
  open({link, name}) {
    this._image = this._popupElement.querySelector(".popup__image");
    this._caption = this._popupElement.querySelector(".popup__caption");
    this._name = name;
    this._link = link;
    
    this._image.src = this._link;
    this._caption.textContent = this._name;

    super.open();
    console.log("popupwithImage");
    console.log(this._name);
    console.log(this._link);
  }
}