//edit button popup//////////////////////////////////////////////////////

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const buttonEdit = document.querySelector(".button__edit");
const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".button__close");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_name");
const inputOccupation = document.querySelector(".popup__input_occupation");

function escape(e) {
  if (e.key === 'Escape') {
    popUnpop();
  }
  e.target.removeEventListener('keyup', escape);
}




function popUnpop () {
  popup.classList.toggle("popup_active");
  inputName.placeholder = "Name";
  inputOccupation.placeholder = "Occupation";

  const popupBackground = document.querySelector(".popup__background");
  popupBackground.addEventListener("click", function() {
    if (popup.classList.contains("popup_active")) {
      popUnpop();
    }
  })
  window.addEventListener('keyup', escape);

}

buttonEdit.addEventListener("click", popUnpop);
buttonClose.addEventListener("click", popUnpop);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  
  popUnpop ();
});

//card construction//////////////////////////////////////////////////////////

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

//open full image/////////////////////////////////
const popupFullImage = document.querySelector(".popup_type_image");
const buttonCloseImage = popupFullImage.querySelector(".button__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function escapeImage(e) {
  if (e.key === 'Escape') {
    fullImage();
  }
  e.target.removeEventListener('keyup', escapeImage);
}

function fullImage(name, link) {
  popupFullImage.classList.toggle("popup_active");
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  const popupBackgroundImage = popupFullImage.querySelector(".popup__background");
  popupBackgroundImage.addEventListener("click", function() {
    if (popupFullImage.classList.contains("popup_active")) {
      fullImage();
    }
  })
  window.addEventListener('keyup', escapeImage);
}

//add new card////////////////////////////////////
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
    buttonCloseImage.addEventListener("click", fullImage);

  });

  return galleryElement;
};
const galleryItems = document.querySelector(".gallery__items");

const renderCard = (name, link) => {
  galleryItems.prepend(createCard(name, link));
};

initialCards.forEach((data) => {
  renderCard(data.name, data.link);
});
//Add button popup////////////////////////////////////////////////////

const buttonAdd = document.querySelector(".button__add");
const popupAdd = document.querySelector(".popup_type_add-button");
const buttonCloseAdd = popupAdd.querySelector(".button__close");
const formAdd = document.querySelector(".popup__form_type_add-button");
const inputTitle = document.querySelector(".popup__input_title");
const inputImageLink = document.querySelector(".popup__input_image-link");

function escapeAdd(e) {
  if (e.key === 'Escape') {
    popUnpopAdd();
  }
  e.target.removeEventListener('keyup', escapeAdd);
}

function popUnpopAdd () {
  popupAdd.classList.toggle("popup_active");
  inputTitle.placeholder = "Image Title";
  inputImageLink.placeholder = "Image Link";

  const popupBackgroundAdd = popupAdd.querySelector(".popup__background");

  popupBackgroundAdd.addEventListener("click", function() {
    if (popupAdd.classList.contains("popup_active")) {
      popUnpopAdd();
    }
  })
  window.addEventListener('keyup', escapeAdd);
}
buttonAdd.addEventListener("click", popUnpopAdd);
buttonCloseAdd.addEventListener("click", popUnpopAdd);

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCard(inputTitle.value, inputImageLink.value);
  popUnpopAdd ();
});