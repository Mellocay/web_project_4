import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {popupImage, formEdit, formAdd, buttonAdd, buttonEdit, inputName, inputOccupation} from "../Utils/constants.js";


import "../pages/index.css";

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

const image = new PopupWithImage(popupImage);
image.setEventListeners();

const newProfile = new UserInfo();



const editProfileValidator = new FormValidator(defaultConfig, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(defaultConfig, formAdd);
addCardValidator.enableValidation();

const cardGrid = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, ".card__template");
    
    const cardElement = card.generateCard();
    cardGrid.addItem(cardElement);
  }
});

const editForm = new PopupWithForm(popupEdit, (data) => {
  newProfile.setUserInfo(data);
});

const addForm = new PopupWithForm(popupAdd, (data) => {
  const newCard = new Card(data, ".card__template");
    const cardElement = newCard.generateCard();

    cardGrid.addItem(cardElement);
});

  buttonAdd.addEventListener("click", () => {addForm.open()});

  buttonEdit.addEventListener("click", () => {
    const profileInfo = newProfile.getUserInfo();
    inputName.value = profileInfo.name;
    inputOccupation.value = profileInfo.occupation;
    editForm.open();
  });

cardGrid.renderItems();

addForm.setEventListeners();

editForm.setEventListeners();















/*
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

function editProfile () {
  togglePopup(popupEdit);
  formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileOccupation.textContent = inputOccupation.value;
    togglePopup(popupEdit);
  });
  const popupBackground = document.querySelector(".popup__background");
  popupBackground.addEventListener("click", () => {
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

function addCard () {
  togglePopup(popupAdd);
  window.addEventListener('keyup', escapeClose);
  const popupBackgroundAdd = popupAdd.querySelector(".popup__background");
  popupBackgroundAdd.addEventListener("click", () => {
    if (popupAdd.classList.contains("popup_active")) {
      togglePopup(popupAdd);
    }
  })
}
window.removeEventListener('keyup', escapeClose);
buttonAdd.addEventListener("click", addCard);
buttonCloseAdd.addEventListener('click', () => {
  togglePopup(popupAdd);
});

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  createCard({name:inputTitle.value, link: inputImageLink.value});
  togglePopup(popupAdd);
});
*/