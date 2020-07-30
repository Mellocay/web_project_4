export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add(".popup_active");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove(".popup_active");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.which === 27) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector(".button__close").addEventListener("click", () => {
      this.close();
    })
    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_active")) {
        this.close();
      }
    })
  }
}