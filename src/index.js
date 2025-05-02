
//import {initialCards} from './scripts/cards.js'
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal, addClosePopupListeners } from './scripts/modal.js';
import {enableValidation, clearValidation} from "./scripts/validation.js";
import {getProfile, getCards, updateProfile, updateAvatar, addCard} from "./scripts/api.js"

const cardList = document.querySelector(".places__list");
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupBigImage = document.querySelector('.popup_type_image');
const popupNewAvatar = document.querySelector('.popup_type_avatar');
const buttonOpenEditProfileForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");

const formEditProfile = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];
const formEditAvatar = document.forms['new-avatar'];

const profileTitle = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

export let userId;

const promises = [getProfile(), getCards()];

Promise.all(promises)
    .then(([userData, cardData]) => {
        userId = userData._id;
        console.log(userId)
        profileTitle.textContent = userData.name;
        profileAbout.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

        cardData.forEach(function (card) {
            const createdCard = createCard(
                card,
                deleteCard,
                likeCard,
                openImagePopup,
                userId
              );
              createdCard.dataset.id = card._id;
              cardList.append(createdCard);
        })
    })
    .catch((err) => {
        console.log("Ошибка", err);
    });

export function openImagePopup(cardImage) {
        const popupImage = popupBigImage.querySelector(".popup__image");
        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        const popupCaption = popupBigImage.querySelector(".popup__caption");
        popupCaption.textContent = cardImage.alt;
        openModal(popupBigImage);
    };

import './index.css';  //импорт главного файла стилей

formEditProfile.addEventListener('submit', submitEditProfileForm);
newPlaceForm.addEventListener('submit', submitAddCardForm);
formEditAvatar.addEventListener("submit", editAvatar);

addClosePopupListeners(popupEditProfile);
popupEditProfile.classList.add('popup_is-animated');
addClosePopupListeners(popupNewCard);
popupNewCard.classList.add('popup_is-animated');
addClosePopupListeners(popupBigImage);
popupBigImage.classList.add('popup_is-animated');
addClosePopupListeners(popupNewAvatar);
popupNewAvatar.classList.add('popup_is-animated');


enableValidation();

buttonOpenEditProfileForm.addEventListener('click', function () {
    formEditProfile.querySelector(".popup__input_type_name").value = document.querySelector(".profile__title").textContent;
    formEditProfile.querySelector(".popup__input_type_description").value = document.querySelector(".profile__description").textContent;
    clearValidation(formEditProfile);
    openModal(popupEditProfile);
})

buttonOpenAddCardForm.addEventListener('click', function() {
    openModal(popupNewCard);
})

profileAvatar.addEventListener('click', function() {
    openModal(popupNewAvatar);
})

function submitEditProfileForm(evt) {
    evt.preventDefault(); 
    const nameInput = formEditProfile.querySelector(".popup__input_type_name");
    const jobInput = formEditProfile.querySelector(".popup__input_type_description");
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    evt.submitter.textContent = "Сохранение...";

    updateProfile(nameInput.value, jobInput.value)

    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      evt.submitter.textContent = "Сохранить";

      closeModal(popupEditProfile);
    })

    .catch((err) => {
      evt.submitter.textContent = "Ошибка сохранения";
      console.log("Ошибка", err);
    });
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    evt.submitter.textContent = "Сохранение...";
    addCard(newPlaceForm['place-name'].value, newPlaceForm['link'].value)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,
        deleteCard,
        likeCard,
        openImagePopup,
        userId
      );
      cardList.prepend(newCard);
      evt.submitter.textContent = "Сохранить";
      clearValidation(newPlaceForm);
    //cardList.prepend(createCard(newPlaceForm['link'].value, newPlaceForm['place-name'].value, deleteCard, likeCard, openImagePopup));
    closeModal(popupNewCard);
    })
    .catch((err) => {
        console.log("Ошибка", err);
      });
}

function editAvatar(evt) {
    evt.preventDefault();
    evt.submitter.textContent = "Сохранение...";

    const avatarUrl = formEditAvatar['avatar-link'].value;
  
    updateAvatar(avatarUrl)
      .then(() => {
        profileAvatar.style.backgroundImage = `url(${avatarUrl})`;
        evt.submitter.textContent = "Сохранить";
        clearValidation(formEditAvatar);
        closeModal(popupNewAvatar);
      })
      .catch((err) => {
        evt.submitter.textContent = "Ошибка обновления аватара";
        console.log("Ошибка обновления аватара", err);
      });
  }
