import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { popupEdit, popupAdd, popupImage, formEditAvatar, formEdit, formAdd, buttonAdd, buttonDelete, buttonEdit, inputName, inputOccupation, initialCards, defaultConfig, popupConfig, profileConfig, cardsConfig, cardSelector, avatarEditButton, profileAvatar } from "../Utils/constants.js";
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
            deleteForm.close();
        })
      })
      },
      handleLikeClick: (cardId) => {
        if (card.likeButton.classList.contains("button__like_activated")) {
          card.likeButton.classList.remove("button__like_activated");
          api.cardLikeRemove(cardId).then(res => card.showLikeCount(res.likes.length))
        } else {
          card.likeButton.classList.add("button__like_activated");
          api.cardLikeAdd(cardId)
          .then(res => card.showLikeCount(res.likes.length))
        }
      }
    }, 
    userId,
    cardSelector);  

    cardGrid.addItem(card.generateCard());
}});

const newProfile = new UserInfo(".profile__name", ".profile__occupation");

api.getUserInfo().then(res => {
  newProfile.setUserInfo({userName: res.name, userOccupation: res.about});
  profileAvatar.src = res.avatar;
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

function handleAvatarEdit(data) {
  api.setUserAvatar({
    avatar: data.avatarURL
  })
  .then(res => {
    profileAvatar.src = res.avatar;
  })
}

const editAvatarForm = new PopupWithForm({
  popupElement: document.querySelector(popupConfig.popupEditAvatar),
  handleFormSubmit: (data) => {
    handleAvatarEdit(data)
    // api.setUserAvatar({ avatar: data.avatarURL })
    // .then(res => {
    //   profileAvatar.src = res.avatar
    // });
    }
});
   
avatarEditButton.addEventListener("click", () => {
  editAvatarForm.open();
});

editAvatarForm.setEventListeners();

const editAvatarValidator = new FormValidator(defaultConfig, formEditAvatar);
editAvatarValidator.enableValidation();