export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector("#like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton = this._cardElement
      .querySelector("#delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImageElement = this._cardElement.querySelector("#card-image");
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    this._cardImageElement
      .querySelector("#preview-image")
      .classList.add("modal_opened");
  }

  getView() {
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card__content")
      .cloneNode(true);

    this._setEventListeners();

    this._cardImageElement = this._cardElement.querySelector("#card-image");
    this._cardTitleElement = this._cardElement.querySelector("#card-title");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;

    return this._cardElement;
  }
}
