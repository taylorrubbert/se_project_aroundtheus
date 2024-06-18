export default class FormValidator {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  _showInputError(inputElement) {
    this._errorMessage = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessage.textContent = inputElement.validationMessage;
    this._errorMessage.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessage.textContent = inputElement.validationMessage;
    this._errorMessage.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  toggleButtonState() {
    if (this._hasInvalidInput(inputElements)) {
      this._disableSubmitButton();
      return;
    }
    this._enableSubmitButton();
  }

  _enableSubmitButton() {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  _disableSubmitButton() {
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = true;
  }

  _setEventListeners() {
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButtonSelector = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation(options) {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

  _hasInvalidInput() {
    return !this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );
  }
}
