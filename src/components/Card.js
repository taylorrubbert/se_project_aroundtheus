export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this.name = data.name;
    this.link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._userId = data._userId;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._previewImageElement = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__content")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector("#like-button");
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this._id, this)
    );

    this._deleteButton = this._cardElement
      .querySelector("#delete-button")
      .addEventListener("click", () => this._handleDeleteClick(this._id, this));

    this._cardImageElement = this._cardElement.querySelector("#card-image");
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getIsLikedState() {
    return this._isLiked;
  }

  updateLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  flipLikeState() {
    this._isLiked = !this._isLiked;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector("#like-button");
    this._deleteButton = this._cardElement.querySelector("#delete-button");
    this._cardImageElement = this._cardElement.querySelector("#card-image");
    this._cardTitleElement = this._cardElement.querySelector("#card-title");

    this.updateLikes();
    this._cardImageElement.src = this.link;
    this._cardImageElement.alt = this.name;
    this._cardTitleElement.textContent = this.name;

    this._setEventListeners();
    return this._cardElement;
  }
}
