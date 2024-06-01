function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  hideInputError(formElement, inputElement, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function setEventListeners(formElement, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputElement = [...formElement.querySelectorAll(inputSelector)];
  const saveButton = formElement.querySelector(submitButtonSelector);

  inputElement.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElement, saveButton, options);
    });
  });
}

function enableValidation(options) {
  const formElement = [...document.querySelectorAll(options.formSelector)];
  formElement.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

function toggleButtonState(inputElement, saveButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputElement)) {
    saveButton.classList.add(inactiveButtonClass, inputErrorClass, options);
    saveButton.disabled = true;
    return;
  }
  saveButton.classList.remove(inactiveButtonClass, inputErrorClass, options);
  saveButton.disabled = false;
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error",
};

enableValidation(options);
