function showInputError(
  formElements,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessage = formElements.querySelector(`#${inputElements.id}-error`);
  inputElements.classList.add(inputErrorClass);
  errorMessage.textContent = inputElements.validationMessage;
  errorMessage.classList.add(errorClass);
}

function hideInputError(
  formElements,
  inputElements,
  { inputErrorClass, errorClass }
) {
  const errorMessage = formElements.querySelector(`#${inputElements.id}-error`);
  inputElements.classList.remove(inputErrorClass);
  errorMessage.textContent = " ";
  errorMessage.classList.remove(errorClass);
}

function checkInputValidity(formElements, inputElements, options) {
  if (!inputElements.validity.valid) {
    return showInputError(formElements, inputElements, options);
  }
  hideInputError(formElements, inputElements, options);
}

function hasInvalidInput(inputElements) {
  return !inputElements.validity.valid;
}

function setEventListeners(formElements, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = [...formElements.querySelectorAll(inputSelector)];
  inputElements.forEach((inputElements) => {
    inputElements.addEventListener("input", (event) => {
      checkInputValidity(formElements, inputElements, options);
      toggleButtonState(inputElements, saveButton, options);
    });
  });
}

function enableValidation(options) {
  formElements.forEach((formElements) => {
    formElements.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElements, options);
  });
}

function enableButton() {
  saveButton.classList.add(saveButton, inactiveButtonClass);
  saveButton.disabled = true;
}
function disableButton() {
  saveButton.classList.remove(saveButton, inactiveButtonClass);
  saveButton.disabled = false;
}

function toggleButtonState(formElements, { inactiveButtonClass, saveButton }) {
  if (hasInvalidInput(formElements)) {
    disableButton();
    return;
  }
  enableButton();
}
const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal_error",
  errorClass: "modal__error_visible",
};
const formElements = [...document.querySelectorAll(options.formSelector)];
const saveButton = document.querySelectorAll(".modal__save");

enableValidation(options);
