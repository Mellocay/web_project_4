import {togglePopup, escapeClose} from "./utils.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const initialCards = [
  {
      name: "Oregon Night Sky",
      link: "./images/oregon-sky.jpg"
  },
  {
      name: "Multnomah Falls, Oregon",
      link: "./images/multnomah-falls.jpg"
  },
  {
      name: "Mt. Hood, Oregon",
      link: "./images/mt-hood.jpg"
  },
  {
      name: "Haystack Rock, Oregon",
      link: "./images/haystack-rock.jpg"
  },
  {
      name: "Ecola State Park, Oregon",
      link: "./images/ecola-park.jpg"
  },
  {
      name: "Crater Lake, Oregon",
      link: "./images/crater-lake.jpg"
  }
];

const defaultConfig = {
  inputSelector: ".popup__input",
  submitButton: ".button__submit",
  inactiveButtonClass: "button__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const popupEdit = document.querySelector(".popup_type_edit-button");
const popupAdd = document.querySelector(".popup_type_add-button");
const formEdit = popupEdit.querySelector(".popup__form");
const formAdd = popupAdd.querySelector(".popup__form");

const editProfileValidator = new FormValidator(defaultConfig, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(defaultConfig, formAdd);
addCardValidator.enableValidation();

//add new card
const cardItems = document.querySelector(".card__items");
const createCard= (data) => {
  const cardTemplate = new Card(data, ".card__template");
  const cardElement = cardTemplate.generateCard();
  cardItems.prepend(cardElement);
}
initialCards.forEach((data) => {
  createCard(data);
});

//Edit profile
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const buttonEdit = document.querySelector(".button__edit");
const buttonClose = document.querySelector(".button__close");
const inputName = document.querySelector(".popup__input_name");
const inputOccupation = document.querySelector(".popup__input_occupation");
const popups = Array.from(document.querySelectorAll(".popup"));

function editProfile () {
  togglePopup(popupEdit);
  formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileOccupation.textContent = inputOccupation.value;
    togglePopup(popupEdit);
  });
  const popupBackground = document.querySelector(".popup__background");
  popupBackground.addEventListener("click", function() {
    if (popupEdit.classList.contains("popup_active")) {
      togglePopup(popupEdit);
    }
  })
}

buttonEdit.addEventListener("click", editProfile);
buttonClose.addEventListener('click', () => {
  togglePopup(popupEdit);
});

//Add card popup
const buttonAdd = document.querySelector(".button__add");
const buttonCloseAdd = popupAdd.querySelector(".button__close");
const inputTitle = document.querySelector(".popup__input_title");
const inputImageLink = document.querySelector(".popup__input_image-link");

function addCard (data) {
  togglePopup(popupAdd);

  const popupBackgroundAdd = popupAdd.querySelector(".popup__background");
  popupBackgroundAdd.addEventListener("click", function() {
    if (popupAdd.classList.contains("popup_active")) {
      togglePopup(popupAdd);
    }
  })
  window.addEventListener('keyup', escapeClose);
}
buttonAdd.addEventListener("click", addCard);
buttonCloseAdd.addEventListener('click', () => {
  togglePopup(popupAdd);
});

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  createCard(inputTitle.value, inputImageLink.value);
  togglePopup(popupAdd);
});
