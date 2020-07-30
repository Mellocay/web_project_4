import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupSelector.querySelector(".popup__form");
  }

  _getInputValues() {
    //collects data from all the input fields.
    this.inputList = this._formElement.querySelectorAll(".popup__input");
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    
    return this.inputValues;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      e.preventDefault();
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