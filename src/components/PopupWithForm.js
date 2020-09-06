import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupElement, handleFormSubmit) {
    super(popupElement);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    console.log("selector is here", popupSelector);
  }

  _getInputValues() {
    //collects data from all the input fields.
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    
    return this._inputValues;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
    super.setEventListeners();
  }
  
  close() {
    super.close();
    this._formElement.reset();
  }
}