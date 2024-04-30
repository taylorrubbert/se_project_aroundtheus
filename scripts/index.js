const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Theodore Roosevelt National Park",
    link: "https://unsplash.com/photos/green-grass-field-and-brown-mountains-during-daytime-oz0b8WpWRuY",
  },
  {
    name: "Redwood National Forest",
    link: "https://unsplash.com/photos/landscape-photography-of-forest-3tW2GR0KAd8",
  },
  {
    name: "Acadia",
    link: "https://unsplash.com/photos/green-trees-on-rocky-shore-during-daytime-QaIXVqqk3H0",
  },
  {
    name: "Lake Clark",
    link: "https://unsplash.com/photos/green-tent-on-rocky-shore-near-mountain-under-cloudy-sky-during-daytime-7SuSlm33MiY",
  },
  {
    name: "Everglades",
    link: "https://unsplash.com/photos/a-large-body-of-water-filled-with-lots-of-green-plants-iac26tSGcJ4",
  },
];

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditBtnClose = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const ProfileEditForm = profileEditModal.querySelector(".modal__edit");

function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditBtnClose.addEventListener("click", closePopUp);

ProfileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp;
});
