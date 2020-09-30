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

const deleteForm = new PopupWithForm({
  popupElement: document.querySelector(popupConfig.popupDelete)
});
deleteForm.setEventListeners();

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

api.getAppInfo().then(([userData, initialCardsData]) => {
  const userId = userData._id;
  const cardGrid = new Section({
    items: initialCardsData,
    renderer: showCard
  }, cardsConfig.placesWrap
  );
 
  cardGrid.renderItems();

  const addForm = new PopupWithForm({
    popupElement: document.querySelector(popupConfig.popupAdd), 
    handleFormSubmit: (data) => {
      api.addCard(data).then(data => {
        showCard(data);
      });
    }
  });
   
  addForm.setEventListeners();
  
  buttonAdd.addEventListener("click", () => {
    addForm.open();
  });

  function handleDeleteClick(cardId) {
    return api.removeCard(cardId);
  }

  function showCard(data) {
    const card = new Card({
      data,
      handleCardClick: () => {
        imagePopup.open(data);
      },
      handleDeleteClick: (cardId) => {
        deleteForm.open(cardId);
        deleteForm.setSubmitAction(() => {
          api.removeCard(cardId).then(() => {
            card.deleteCard();
            deleteForm.closeNoInput();
        })
      })
      },
    }, 
    userId,
    cardSelector);  

    cardGrid.addItem(card.generateCard());
}});

const newProfile = new UserInfo(".profile__name", ".profile__occupation");

api.getUserInfo().then(res => {
  newProfile.setUserInfo({userName: res.name, userOccupation: res.about});
});

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
    });
  }
});
   
buttonEdit.addEventListener("click", () => {
  const profileInfo = newProfile.getUserInfo();
  inputName.value = profileInfo.name;
  inputOccupation.value = profileInfo.occupation;
  editForm.open();
});

editForm.setEventListeners();