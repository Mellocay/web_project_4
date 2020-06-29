const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const buttonEdit = document.querySelector(".button__edit");
const popupEdit = document.querySelector(".popup_type_edit-button");
const buttonClose = document.querySelector(".button__close");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_name");
const inputOccupation = document.querySelector(".popup__input_occupation");
const popupAdd = document.querySelector(".popup_type_add-button");
const popupBackground = Array.from(document.querySelectorAll(".popup__background"));
const popups = Array.from(document.querySelectorAll(".popup"));

//open and close popup
function togglePopup(popup){
  popup.classList.toggle("popup_active");
  if (popup.classList.contains("popup_active")) {
    window.addEventListener('keydown', escapeClose);
  } else {
    window.removeEventListener('keydown', escapeClose);
  }
}
//close by escape
function escapeClose(evt) {
  if (evt.key === "Escape") {
    togglePopup(document.querySelector(".popup_active"));
  }
}

//close by background click
function backgroundClickClose () {
  if (popup.classList.contains("popup_active")) {
    togglePopup(popup);
  }
}

//image popup
const popupFullImage = document.querySelector(".popup_type_image");
const buttonCloseImage = popupFullImage.querySelector(".button__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function fullImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  togglePopup(popupFullImage);
  popupBackground.addEventListener("click", function() {
    backgroundClickClose();
  });
  window.addEventListener('keyup', escapeClose);
};

//Edit profile
function editProfile () {
  togglePopup(popupEdit);
  inputName.placeholder = "Name";
  inputOccupation.placeholder = "Occupation";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileOccupation.textContent = inputOccupation.value;
    togglePopup(popupEdit);
  });
  popupBackground.addEventListener("click", backgroundClickClose);
}

buttonEdit.addEventListener("click", editProfile);
buttonClose.addEventListener('click', () => {
  togglePopup(popupEdit);
});

//card construction
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

//add new card
const galleryTemplate = document.querySelector(".gallery__template").content.querySelector(".gallery__item");

const createCard= (name, link) => {
  const galleryElement = galleryTemplate.cloneNode(true);
  const galleryImage = galleryElement.querySelector(".gallery__image");
  const buttonRemove = galleryElement.querySelector(".button__remove");
  const galleryTitle = galleryElement.querySelector(".gallery__title");
  const buttonLike = galleryElement.querySelector(".button__like");

  galleryTitle.textContent = name;
  galleryImage.style.background = `url(${link})`;
  galleryImage.style.backgroundSize = "cover";

  buttonLike.addEventListener("click", (evt) => {
    function changeHeartColor() {
      buttonLike.classList.toggle("button__like_activated");
    }
    changeHeartColor();
  });
  buttonRemove.addEventListener("click", (evt) => {
    evt.target.closest(".gallery__item").remove();
  });
  galleryImage.addEventListener("click", () => {
    fullImage(name, link);
    galleryImage.addEventListener("click", fullImage);
   

  });
  return galleryElement;
};

buttonCloseImage.addEventListener('click', () => {
  togglePopup(popupFullImage);
});
const galleryItems = document.querySelector(".gallery__items");

const renderCard = (name, link) => {
  galleryItems.prepend(createCard(name, link));
};
initialCards.forEach((data) => {
  renderCard(data.name, data.link);
});

//Add card popup
const buttonAdd = document.querySelector(".button__add");
const buttonCloseAdd = popupAdd.querySelector(".button__close");
const formAdd = document.querySelector(".popup__form_type_add-button");
const inputTitle = document.querySelector(".popup__input_title");
const inputImageLink = document.querySelector(".popup__input_image-link");

function addCard () {
  togglePopup(popupAdd);
  createCard();
  inputTitle.placeholder = "Image Title";
  inputImageLink.placeholder = "Image Link";

  popupBackground.addEventListener("click", backgroundClickClose);
  window.addEventListener('keyup', escapeClose);
}
buttonAdd.addEventListener("click", addCard);
buttonCloseAdd.addEventListener('click', () => {
  togglePopup(popupAdd);
});

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCard(inputTitle.value, inputImageLink.value);
  togglePopup(popupAdd);
});