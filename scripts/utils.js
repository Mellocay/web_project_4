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



function fullImage(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
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