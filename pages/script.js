//edit button popup//////////////////////////////////////////////////////

const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const buttonEdit = document.querySelector(".button__edit");
const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".button__close");
const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_name");
const inputOccupation = document.querySelector(".popup__input_occupation");

function popUnpop () {
  popup.classList.toggle("popup_active");
  inputName.value = "Jacques Cousteau";
  inputOccupation.value = "Explorer";
}
buttonEdit.addEventListener("click", popUnpop);
buttonClose.addEventListener("click", popUnpop);

form.addEventListener("submit", function(e) {
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
  galleryImage.style.minHeight = "282px";

  buttonLike.addEventListener("click", (evt) => {
    function changeHeartColor() {
      buttonLike.classList.toggle("button__like_activated");
    }
    changeHeartColor();
  });
  buttonRemove.addEventListener("click", (evt) => {
    evt.target.closest(".gallery__item").remove();
  });
  galleryImage.addEventListener("click", (evt) => {
    fullPicture();
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
const buttonCreate = document.querySelector(".button__submit_create");
const inputTitle = document.querySelector(".popup__input_title");
const inputImageLink = document.querySelector(".popup__input_image-link");

function popUnpopAdd () {
  popupAdd.classList.toggle("popup_active");
  inputTitle.placeholder = "Image Title";
  inputImageLink.placeholder = "Image Link";
}
buttonAdd.addEventListener("click", popUnpopAdd);
buttonCloseAdd.addEventListener("click", popUnpopAdd);

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCard(inputTitle.value, inputImageLink.value);
  popUnpopAdd ();
});
