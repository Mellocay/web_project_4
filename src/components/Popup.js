export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_active");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_active");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.which === 27) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector(".button__close").addEventListener("click", () => {
      this.close();
    })
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_active")) {
        this.close();
      }
    })
  }
}