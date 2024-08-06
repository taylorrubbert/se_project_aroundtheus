import "../pages/index.css";
import { initialCards, options } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

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

//Edit Avatar
const editAvatarForm = document.querySelector("#edit-avatar-form");
const editAvatarButton = document.querySelector(".avatar__edit-button");

//Add New Card
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardBtn = document.querySelector(".profile__add-button");

//API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9d8df36b-440d-4bca-949a-3193d9385b7e",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */
//Edit Profile Popup
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

//Edit Avatar Popup
const editAvatarPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleNewAvatarSubmit
);
editAvatarPopup.setEventListeners();
let userId;

//Add New Card Popup
const newCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
newCardPopup.setEventListeners();

//Deelte Card Popup
const deleteCardPopup = new PopupDeleteCard({
  popupSelector: "#delete-card-modal",
});
deleteCardPopup.setEventListeners();

//Preview Image Popup
const previewImagePopup = new PopupWithImage("#preview-modal");
previewImagePopup.setEventListeners();

//Section
let cardSection;
api
  .getAppData()
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
    userInfo.setAvatar({ avatar: userData.avatar });
    userId = userData._id;

    cardSection = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          cardSection.addItem(createCard(item));
        },
      },
      cardListElement
    );
    cardSection.renderItems();
  })
  .catch(console.error);

//UserInfo
const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
  avatar: ".profile__image",
});

//Create Card
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  );
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function handleImageClick(name, link) {
  previewImagePopup.open(name, link);
}

function handleProfileEditSubmit(profileData) {
  editProfilePopup.renderLoading(true);
  api
    .updateProfileInfo(profileData)
    .then(() => {
      userInfo.setUserInfo({ name, subtitle });
      const name = profileData.name;
      const subtitle = profileData.description;
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}, Could not update user info!`);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

function handleAddCardSubmit(inputValues) {
  newCardPopup.renderLoading(true);
  api
    .addCard({ name: inputValues.title, link: inputValues.url })
    .then((newCardData) => {
      cardSection.addItem(createCard(newCardData));
      addCardForm.reset();
      newCardPopup.close();
      addCardFormValidator.resetForm();
    })
    .catch(console.error)
    .finally(() => {
      newCardPopup.renderLoading(true);
    });
}

function handleNewAvatarSubmit(data) {
  editAvatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(data.url)
    .then((res) => {
      userInfo.setUserAvatar(res);
      editAvatarPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
}

function handleDeleteCard(cardId, card) {
  deleteCardPopup.open();
  deleteCardPopup.handleDeleteConfirm(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

function handleLikeCard(cardId, cardElement) {
  if (cardElement.getIsLikedState()) {
    api
      .unlikeCard(cardId)
      .then((updatedCardData) => {
        cardElement.flipLikeState();
        cardElement.updateLikes(updatedCardData.isLiked);
      })
      .catch(console.error);
  } else {
    api
      .likeCard(cardId)
      .then((updatedCardData) => {
        cardElement.flipLikeState();
        cardElement.updateLikes(updatedCardData.isLiked);
      })
      .catch(console.error);
  }
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Edit Profile Form
profileEditBtn.addEventListener("click", () => {
  const userInput = userInfo.getUserInfo();
  profileTitleInput.value = userInput.name;
  profileDescriptionInput.value = userInput.description;
  editProfilePopup.open();
});

//Edit Avatar Form
editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  editAvatarFormValidator.resetValidation();
});

//New Card Form
addCardBtn.addEventListener("click", () => {
  newCardPopup.open();
  addCardFormValidator.toggleButtonState();
});

/* -------------------------------------------------------------------------- */
/*                               Validation                                 */
/* -------------------------------------------------------------------------- */
const addCardFormValidator = new FormValidator(options, addCardForm);
addCardFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(options, profileEditForm);
profileEditFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(options, editAvatarForm);
editAvatarFormValidator.enableValidation();
