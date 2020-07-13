function togglePopup(popup){
  popup.classList.toggle("popup_active");
  if (popup.classList.contains("popup_active")) {
    window.addEventListener('keydown', escapeClose);
  } else {
    window.removeEventListener('keydown', escapeClose);
  }
}

//close by escape
function escapeClose(evt) {
  if (evt.key === "Escape") {
    togglePopup(document.querySelector(".popup_active"));
  }
}

const popupFullImage = document.querySelector(".popup_type_image");
const buttonCloseImage = popupFullImage.querySelector(".button__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function fullImage(this._link, this._name) {
  popupImage.src = this._link;
  popupImage.alt = this._name;
  popupCaption.textContent = this._name;
  togglePopup(popupFullImage);
  const popupBackgroundImage = popupFullImage.querySelector(".popup__background");
  popupBackgroundImage.addEventListener("click", function() {
    if (popupFullImage.classList.contains("popup_active")) {
      togglePopup(popupFullImage);
    }
  })
};
buttonCloseImage.addEventListener('click', () => {
  togglePopup(popupFullImage);
});

export {togglePopup};
export {escapeClose};
export {fullImage};