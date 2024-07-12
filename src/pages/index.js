import "../pages/index.css";
import { initialCards, options } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
//Templates
const cardListElement = document.querySelector(".card__list");

//Edit Profile
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Add New Card
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardBtn = document.querySelector(".profile__add-button");

/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */
//Edit Profile Popup
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

//Add New Card Popup
const newCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
newCardPopup.setEventListeners();

//Preview Image Popup
const previewImagePopup = new PopupWithImage("#preview-modal");
previewImagePopup.setEventListeners();

//Section
const section = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      renderCard(item, cardListElement);
    },
  },
  cardListElement
);
section.renderItems();
//UserInfo
const user = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function handleImageClick(name, link) {
  previewImagePopup.open(name, link);
}

function handleProfileEditSubmit(profileData) {
  const name = profileData.title;
  const description = profileData.description;
  user.setUserInfo({ name, description });
  const updatedProfile = user.getUserInfo();
  editProfilePopup.close();
}

function handleAddCardSubmit(newCardData, cardListElement) {
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.url;
  renderCard({ name, alt, link }, cardListElement);
  newCardPopup.close();
  addCardFormValidator.resetForm();
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick
  ).getView();

  cardListElement.prepend(cardElement);
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Edit Profile Form
profileEditBtn.addEventListener("click", () => {
  const UserInfo = user.getUserInfo();
  profileTitleInput.value = UserInfo.name;
  profileDescriptionInput.value = UserInfo.description;
  editProfilePopup.open();
});

//New Card Form
addCardBtn.addEventListener("click", () => {
  newCardPopup.open();
  addCardFormValidator._disableSubmitButton();
});

/* -------------------------------------------------------------------------- */
/*                               Validation                                 */
/* -------------------------------------------------------------------------- */
const addCardFormValidator = new FormValidator(options, addCardForm);
addCardFormValidator.enableValidation();
const profileEditFormValidator = new FormValidator(options, profileEditForm);
profileEditFormValidator.enableValidation();
