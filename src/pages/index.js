import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { formEditAvatar, formEdit, formAdd, buttonAdd, buttonDelete, buttonEdit, inputName, inputOccupation, initialCards, defaultConfig, popupConfig, profileConfig, cardsConfig, cardSelector, submitButton, avatarEditButton, profileAvatar } from "../Utils/constants.js";
import Api from "../components/Api.js";
import "./index.css";

const popupEdit = document.querySelector(".popup_type_edit-button"); 
const popupAdd = document.querySelector(".popup_type_add-button"); 
const popupImage = document.querySelector(".popup_type_image"); 
const popupDelete = document.querySelector(".popup_type_delete"); 
const popupAvatar = document.querySelector(".popup_type_edit-avatar");

function loading(isLoading, popup) {
  if (isLoading) {
    popup.querySelector(".button__submit").textContent = "Saving...";
  } else {
    popup.querySelector(".button__submit").textContent = "Saved";
  }
}

function deleting(isDeleting, popup) {
  if (isDeleting) {
    popup.querySelector(".button__submit").textContent = "Deleting...";
  } else {
    popup.querySelector(".button__submit").textContent = "Deleted";
  }
}

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
  }, 
  cardsConfig.placesWrap
  )
  
  cardGrid.renderItems();
  
  const addForm = new PopupWithForm({
    popupElement: document.querySelector(popupConfig.popupAdd), 
    handleFormSubmit: (data) => {
      loading(true, popupAdd);
      api.addCard(data).then(data => {
        showCard(data);
        addForm.close();
      })
      .catch(err => console.log(err))
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
          deleting(true, popupDelete);
          api.removeCard(cardId).then(() => {
            card.deleteCard();
            deleting(false, popupDelete);
            deleteForm.close();
        })
        .catch(err => console.log(err))
      })
      },
      handleLikeClick: (cardId) => {
        if (card.likeButton.classList.contains("button__like_activated")) {
          card.likeButton.classList.remove("button__like_activated");
          api.cardLikeRemove(cardId).then(res => card.showLikeCount(res.likes.length))
          .catch(err => console.log(err))
        } else {
          card.likeButton.classList.add("button__like_activated");
          api.cardLikeAdd(cardId)
          .then(res => card.showLikeCount(res.likes.length))
          .catch(err => console.log(err))
        }
      }
    }, 
    userId,
    cardSelector);  

    cardGrid.addItem(card.generateCard());
    loading(false, popupAdd);

    const newProfile = new UserInfo(".profile__name", ".profile__occupation");
    
    api.getUserInfo().then(res => {
      newProfile.setUserInfo({userName: res.name, userOccupation: res.about});
      profileAvatar.src = res.avatar;
    })
    .catch(err => console.log(err));
    
    const editForm = new PopupWithForm({
      popupElement: document.querySelector(popupConfig.popupEdit),
      handleFormSubmit: (data) => {
        loading(true, popupEdit);
        api.setUserInfo({name: data.name, about: data.occupation})
        .then(res => {
          newProfile.setUserInfo({userName: data.name, userOccupation:  data.occupation});
        })
        .then(res => {
          loading(false, popupEdit); 
          editForm.close();
        })
        .catch(err => console.log(err))
      }
    });
    
    buttonEdit.addEventListener("click", () => {
      const profileInfo = newProfile.getUserInfo();
      inputName.value = profileInfo.name;
      inputOccupation.value = profileInfo.occupation;
      editForm.open();
    });
    
    editForm.setEventListeners();

}}).catch(err => console.log(err));


const editProfileValidator = new FormValidator(defaultConfig, formEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(defaultConfig, formAdd);
addCardValidator.enableValidation();


function handleAvatarEdit(data) {
  loading(true, popupAvatar);
  api.setUserAvatar({
    avatar: data.avatarURL
  })
  .then(res => {
    profileAvatar.src = res.avatar;
    loading(false, popupAvatar);
    editAvatarForm.close();
  })
  .catch(err => console.log(err));
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