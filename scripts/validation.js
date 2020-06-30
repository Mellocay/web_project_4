function showErrorMessage(input, errorClass, inputErrorClass) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;

  error.classList.add(errorClass);
  input.classList.add(inputErrorClass);
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

function toggleButtonState(inputs, inactiveButtonClass, submitButtonSelector) {
  const isValid = inputs.every((input) => input.validity.valid)

  if(isValid) {
    submitButtonSelector.classList.remove(inactiveButtonClass);
    submitButtonSelector.removeAttribute("disabled", "");
  } else {
    submitButtonSelector.classList.add(inactiveButtonClass);
    submitButtonSelector.setAttribute("disabled", "");
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