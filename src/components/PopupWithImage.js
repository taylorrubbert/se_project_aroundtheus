import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(data) {
    const popupPreviewImage = document.querySelector("#preview-image");
    popupPreviewImage.src = data._link;
    popupPreviewImage.alt = data._name; // or popupPreviewImage.title = data._name;
    super.open();
  }
}
