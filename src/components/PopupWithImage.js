import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector("#preview-image");
    this._previewImageTitle = this._popupElement.querySelector(
      "#preview-image-title"
    );
  }

  open(data) {
    this._previewImage.src = data._link;
    this._previewImage.alt = data._name;
    this._previewImageTitle.textContent = data._name;
    super.open();
  }
}
