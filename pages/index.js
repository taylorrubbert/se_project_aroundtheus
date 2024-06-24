import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
//Templates
const cardListElement = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modals = document.querySelectorAll(".modal");

//Edit Profile
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Add New Card
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardBtn = document.querySelector(".profile__add-button");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");
const cardSelector = document.querySelector("#card-template");

//Preview Image
const previewImageModal = document.querySelector("#preview-modal");
const previewImageElement = previewImageModal.querySelector("#preview-image");
const previewImageTextElement = previewImageModal.querySelector(
  "#preview-image-title"
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function renderCard(cardData, wrapper) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick
  ).getView();
  wrapper.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListElement);
  closeModal(addCardModal);
  e.target.reset();
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.modal_opened").forEach(closeModal);
  }
}

function handleImageClick(card) {
  previewImageElement.src = card.link;
  previewImageElement.alt = card.name;
  previewImageTextElement.textContent = card.name;

  openModal(previewImageModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Edit Profile Form
profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//New Card Form
addCardForm.addEventListener("submit", handleAddCardSubmit);
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
  addCardFormValidator.toggleButtonState();
});

//Close modal
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal || e.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error",
};

//Validation
const addCardFormValidator = new FormValidator(options, addCardForm);
addCardFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(options, profileEditForm);
profileEditFormValidator.enableValidation();

initialCards.forEach((cardData) => renderCard(cardData, cardListElement));
