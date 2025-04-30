
import {initialCards} from './scripts/cards.js'
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal, addClosePopupListeners } from './scripts/modal.js';
import {enableValidation, clearValidation} from "./scripts/validation.js";

const cardList = document.querySelector(".places__list");
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupBigImage = document.querySelector('.popup_type_image');
const buttonOpenEditProfileForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");

const formEditProfile = document.querySelector(".edit-profile");

export function openImagePopup(cardImage) {
        const popupImage = popupBigImage.querySelector(".popup__image");
        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        const popupCaption = popupBigImage.querySelector(".popup__caption");
        popupCaption.textContent = cardImage.alt;
        openModal(popupBigImage);
    };


for(let i=0; i<initialCards.length; i=i+1) {
    cardList.append(createCard(initialCards[i].link, initialCards[i].name, deleteCard, likeCard, openImagePopup));
}

import './index.css';  //импорт главного файла стилей

addClosePopupListeners(popupEditProfile);
popupEditProfile.classList.add('popup_is-animated');
addClosePopupListeners(popupNewCard);
popupNewCard.classList.add('popup_is-animated');
addClosePopupListeners(popupBigImage);
popupBigImage.classList.add('popup_is-animated');

enableValidation();



buttonOpenEditProfileForm.addEventListener('click', function () {
    formEditProfile.name.value = document.querySelector(".profile__title").textContent;
    formEditProfile.description.value = document.querySelector(".profile__description").textContent;
    openModal(popupEditProfile);
})



buttonOpenAddCardForm.addEventListener('click', function() {
    openModal(popupNewCard);
})


// Находим поля формы в DOM
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

function submitEditProfileForm(evt) {
    evt.preventDefault(); 

    const profileName = nameInput.value;
    const profileJob = jobInput.value;
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    profileTitle.textContent = profileName;
    profileDescription.textContent = profileJob;
    closeModal(popupEditProfile);
}

const newPlaceForm = document.forms['new-place'];

function submitAddCardForm(evt) {
    evt.preventDefault();
    cardList.prepend(createCard(newPlaceForm['link'].value, newPlaceForm['place-name'].value, deleteCard, likeCard, openImagePopup));
    closeModal(popupNewCard);
}


formEditProfile.addEventListener('submit', submitEditProfileForm);
newPlaceForm.addEventListener('submit', submitAddCardForm);