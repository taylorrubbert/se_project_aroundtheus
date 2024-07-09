export default class Popup {
  constructor({ popupSelector }) {
    //this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
        //} else if (e.target.classList.contains("modal__close")) {
      }
    });
  }
}
