import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { popupEdit, popupAdd, popupImage, formEdit, formAdd, buttonAdd, buttonDelete, buttonEdit, inputName, inputOccupation, initialCards, defaultConfig, popupConfig, profileConfig, cardsConfig, cardSelector } from "../Utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-5",
  headers: {
    authorization: "6eeb54a7-daa3-4961-9f3b-d820b89ec651",
    "Content-Type": "application/json"
  }
});

api.getAppInfo().then(([userData, initialCardsData]) => {
  const userId = userData._id;
  const cardGrid = new Section({
    items: initialCardsData,
    renderer: (data) => {
      const card = new Card({
        data,
        handleCardClick: () => {
          imagePopup.open(data);
        },
        handleDeleteClick: (cardId) => {
          api.removeCard(cardId).then(() => {})
        },
      }, 
      userId,
      cardSelector);      
      cardGrid.addItem(card.generateCard());
    },
  }, cardsConfig.placesWrap
  );

  cardGrid.renderItems();

function handleDeleteClick(cardId) {
  return api.removeCard(cardId);
}

const deleteForm = new PopupWithForm({
  popupElement: document.querySelector(popupConfig.popupDelete),
  handleFormSubmit: (cardId) => {
    handleDeleteClick(cardId);
    deleteForm.close();
  }
});
deleteForm.setEventListeners();
// buttonDelete.addEventListener("click", () => {
//   debugger;
//   popupDelete.open(cardId);
//   api.removeCard(cardId).then(() => {})
// })

  const addForm = new PopupWithForm({
    popupElement: document.querySelector(popupConfig.popupAdd), 
    handleFormSubmit: (data) => {
      api.addCard(data).then(res => {
      const card = new Card({
        data, 
        handleCardClick: () => {
          imagePopup.open(data);
        }
      }, 
      userId,
      cardSelector);
  // const cardElement = card.generateCard();
  cardGrid.addItem(card.generateCard())
  });
    }
  });

//   showCard(data)
 
  addForm.setEventListeners();

  buttonAdd.addEventListener("click", () => {
    addForm.open();
  });
})


const newProfile = new UserInfo(".profile__name", ".profile__occupation");

api.getUserInfo().then(res => {
  newProfile.setUserInfo({userName: res.name, userOccupation: res.about})
})

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();


const editProfileValidator = new FormValidator(defaultConfig, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(defaultConfig, formAdd);
addCardValidator.enableValidation();

const editForm = new PopupWithForm({
  popupElement: document.querySelector(popupConfig.popupEdit),
  handleFormSubmit: (data) => {
    api.setUserInfo({name: data.name, about: data.occupation})
    .then(res => {
      newProfile.setUserInfo({userName: data.name, userOccupation:  data.occupation});
    })
  }
})
   
buttonEdit.addEventListener("click", () => {
  const profileInfo = newProfile.getUserInfo();
  inputName.value = profileInfo.name;
  inputOccupation.value = profileInfo.occupation;
  editForm.open();
});

editForm.setEventListeners();