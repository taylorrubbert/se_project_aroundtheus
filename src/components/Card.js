export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._previewImageElement = null;
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
      this._handleImageClick(this);
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
    this._previewImageElement.classList.add("modal_opened");
  }

  getView() {
    this._cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card__content")
      .cloneNode(true);

    this._setEventListeners();

    this._cardImageElement = this._cardElement.querySelector("#card-image");
    this._cardTitleElement = this._cardElement.querySelector("#card-title");
    this._cardImageElement.src = this.link;
    this._cardImageElement.alt = this.name;
    this._cardTitleElement.textContent = this.name;

    return this._cardElement;
  }
}
