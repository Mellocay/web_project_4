let buttonEdit = document.querySelector(".button_edit");
let popup = document.querySelector(".popup");

function popUnpop () {
  popup.classList.toggle("popup_active");
}
buttonEdit.addEventListener("click", popUnpop);


let buttonClose = document.querySelector(".button_close");
let buttonSave = document.querySelector(".button_save");

buttonClose.addEventListener("click", popUnpop);
//buttonSave.addEventListener("click", popUnpop);


let form = document.querySelector(".popup__form");
let input = document.querySelector(".popup__input");
let nameInput = document.querySelector(".popup__input_name");
let occupationInput = document.querySelector(".popup__input_occupation");
let profileName = document. querySelector(".profile__name");
let profileOccupation = document. querySelector(".profile__occupation");

function editProfile (evt) {
  evt.preventDefault();

  var name = document.querySelector("nameInput.value");
  var occupation = document.querySelector("occupationInput.value");

  function replaceNameInput () {
    nameInput.value = profileName.textContent;
  }
  replaceNameInput ();

  function replaceOccupationInput () {
    profileOccupation.textContent = occupation;
  }
  replaceOccupationInput ();
  popUnpop ();
}

buttonSave.addEventListener("click", editProfile);