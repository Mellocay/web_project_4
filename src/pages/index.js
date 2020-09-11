import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { popupEdit, popupAdd, popupImage, formEdit, formAdd, buttonAdd, buttonEdit, inputName, inputOccupation, initialCards, defaultConfig, popupConfig, profileConfig, cardsConfig } from "../Utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";

// function showCard(data) {
  // const card = new Card (data, ".card__template", (data) => {
  //   imagePopup.open(data)})
  // const cardElement = card.generateCard();
  // cardGrid.addItem(cardElement);
// }

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-4",
  headers: {
    authorization: "3f243dd2-37f2-4509-9805-b98e5f815aea",
    "Content-Type": "application/json"
  }
});

// api.getAppInfo().then((res) => {
//   console.log("data", res);
//   console.log("initial", res);
//   const UserId = res._id;
api.getCardList().then(res => {
  const cardGrid = new Section({
    items: res,
    renderer: (data) => {
      const card = new Card({
        data, 
        handleCardClick: () => {
          imagePopup.open(data);
          console.log(imagePopup);
        },
        handleDeleteClick: (cardId) => {
          api.removeCard(cardId)
        }
      }, cardsConfig.cardSelector);      
      // const cardElement = card.generateCard();
      cardGrid.addItem(card.generateCard());
    }
  }, cardsConfig.placesWrap
  );

  cardGrid.renderItems();



  const addForm = new PopupWithForm({
    popupElement: document.querySelector(popupConfig.popupAdd), 
    handleFormSubmit: (data) => {
      api.addCard(data).then(res => {
      const card = new Card({
        data, 
        handleCardClick: () => {
          imagePopup.open(data);
        }
      }, cardsConfig.cardSelector);
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
  console.log("profile!!", res);
  newProfile.setUserInfo({userName: res.name, userOccupation: res.about})
})

function handleProfileEdit(data) {
  api.setUserInfo({
    name: data.name, 
    about: data.about,
   })
  .then(res => {
    newProfile.setUserInfo({
      userName: data.name,
      userOccupation: data.about});
     console.log("hello....", res);
    })
}



function submitProfileForm(data) {
  handleProfileEdit(data);
  //profileForm.open();
}

const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();


const editProfileValidator = new FormValidator(defaultConfig, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(defaultConfig, formAdd);
addCardValidator.enableValidation();

const editForm = new PopupWithForm({
  popupElement: document.querySelector(popupConfig.popupEdit),
  handleFormSubmit: (data)=> {
    newProfile.setUserInfo({userName: inputName.value, userOccupation: inputOccupation.value });
    console.log(inputName.value, "hello");
  }
})
// const profileConfig = {
//   profileName: "profile__name",
//   profileDescription: "profile__occupation"
// };


// const addForm = new PopupWithForm(".popup_type_add-button", (data) => {
//   const card = new Card (data, ".card__template", (data) => {
//   imagePopup.open(data)})
// const cardElement = card.generateCard();
// cardGrid.addItem(cardElement);
// });
// addForm.setEventListeners();



// buttonAdd.addEventListener("click", () => {addForm.open()});


buttonEdit.addEventListener("click", () => {
  const profileInfo = newProfile.getUserInfo();
  inputName.value = profileInfo.name;
  inputOccupation.value = profileInfo.occupation;
  editForm.open();
});



editForm.setEventListeners();