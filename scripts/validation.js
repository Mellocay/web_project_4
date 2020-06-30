function showErrorMessage(input, errorClass, inputErrorClass) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;

  error.classList.add(errorClass);
  input.classList.add(inputErrorClass);
  input.classList.add("popup__input_type_error");
}

function hideErrorMessage(input, errorClass, inputErrorClass) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = "";

  error.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
}

function checkInputValidity(input, form, rest) {
  if(input.validity.valid) {
    hideErrorMessage(input, form, rest);
  } else{
    showErrorMessage(input, form, rest);
  }
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
  const isValid = inputs.every((input) => input.validity.valid)

  if(isValid) {
    button.classList.remove("popup__button_disabled");
    button.removeAttribute("disabled");
  } else {
    button.classList.add("popup__button_disabled");
    button.setAttribute("disabled", "");
  }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {
  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, form, rest);
        toggleButtonState(inputs, button, rest);
      })
    })
  })
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button__submit",
  inactiveButtonClass: "button__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});