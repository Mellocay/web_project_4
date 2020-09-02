import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { popupEdit, popupAdd, popupImage, formEdit, formAdd, buttonAdd, buttonEdit, inputName, inputOccupation } from "../Utils/constants.js";
import oregonNightSky from "../images/oregon-sky.jpg";
import multnomahFalls from "../images/multnomah-falls.jpg";
import mtHood from "../images/mt-hood.jpg"
import haystackRock from "../images/haystack-rock.jpg";
import ecolaPark from "../images/ecola-park.jpg"
import craterLake from "../images/crater-lake.jpg"
import Api from "../components/Api.js";
import "./index.css";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-4",
  headers: {
    authorization: "3f243dd2-37f2-4509-9805-b98e5f815aea",
    "Content-Type": "application/json"
  }
});

api.getCardList().then(res => {
  console.log("is it working?")
})

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

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

const newProfile = new UserInfo(".profile__name", ".profile__occupation");

const editProfileValidator = new FormValidator(defaultConfig, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(defaultConfig, formAdd);
addCardValidator.enableValidation();

function showCard(data) {
  const card = new Card (data, ".card__template", (data) => {
    imagePopup.open(data)})
  const cardElement = card.generateCard();
  cardGrid.addItem(cardElement);
}

const cardGrid = new Section({
  items: initialCards,
  renderer: (data) => {
    showCard(data);
  }
}, ".card__items");

const editForm = new PopupWithForm(popupEdit, (data)=> {
  newProfile.setUserInfo({userName: inputName.value, userOccupation: inputOccupation.value });
  }
)

const addForm = new PopupWithForm(popupAdd, (data) => {
  showCard(data)
  }
);

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