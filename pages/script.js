let button_edit = document.querySelector(".button_edit");
let popup = document.querySelector(".popup");

function popping () {
  popup.classList.toggle("popup_active");
}

button_edit.addEventListener("click", popping);