const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const buttonEdit = document.querySelector(".button__edit");
const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".button__close");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_name");
const inputOccupation = document.querySelector(".popup__input_occupation");

function popUnpop () {
  popup.classList.toggle("popup_active");
  inputName.value = "Jacques Cousteau";
  inputOccupation.value = "Explorer";
}
buttonEdit.addEventListener("click", popUnpop);
buttonClose.addEventListener("click", popUnpop);

form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  
  popUnpop ();
})
