import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { popupImage, formEdit, formAdd, buttonAdd, buttonEdit, inputName, inputOccupation } from "../Utils/constants.js";
import oregonNightSky from "../images/oregon-sky.jpg";
import multnomahFalls from "../images/multnomah-falls.jpg";
import mtHood from "../images/mt-hood.jpg"
import haystackRock from "../images/haystack-rock.jpg";
import ecolaPark from "../images/ecola-park.jpg"
import craterLake from "../images/crater-lake.jpg"


import "./index.css";

const initialCards = [
  {
    name: "Oregon Night Sky",
    link: oregonNightSky
  },
  {
    name: "Multnomah Falls, Oregon",
    link: multnomahFalls
  },
  {
    name: "Mt. Hood, Oregon",
    link: mtHood
  },
  {
    name: "Haystack Rock, Oregon",
    link: haystackRock
  },
  {
    name: "Ecola State Park, Oregon",
    link: ecolaPark
  },
  {
    name: "Crater Lake, Oregon",
    link: craterLake
  }
];

const defaultConfig = {
  inputSelector: ".popup__input",
  submitButton: ".button__submit",
  inactiveButtonClass: "button__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const newProfile = new UserInfo();



const editProfileValidator = new FormValidator(defaultConfig, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(defaultConfig, formAdd);
addCardValidator.enableValidation();

const cardGrid = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, ".card__template", (data) => {
      imagePopup.open(data);
    });

    const cardElement = card.generateCard();
    cardGrid.addItem(cardElement);
  }
}, ".card__items");

const editForm = new PopupWithForm(".popup_type_edit-button", (data) => {
  newProfile.setUserInfo(data);
});

const addForm = new PopupWithForm(".popup_type_add-button", (data) => {
  const newCard = new Card({ name: data.title, link: data["image-link"] }, ".card__template", (data) => {
    imagePopup.open(data);
  });
  const cardElement = newCard.generateCard();

  cardGrid.addItem(cardElement);
});

buttonAdd.addEventListener("click", () => { addForm.open() });

buttonEdit.addEventListener("click", () => {
  const profileInfo = newProfile.getUserInfo();
  inputName.value = profileInfo.name;
  inputOccupation.value = profileInfo.occupation;
  editForm.open();
});

cardGrid.renderItems();

addForm.setEventListeners();

editForm.setEventListeners();