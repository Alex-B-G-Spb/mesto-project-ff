
import {initialCards} from './scripts/cards.js'
import { cardCreation} from './scripts/card.js';
import { openModal, closeModal, addListeners } from './scripts/modal.js';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
export const cardList = document.querySelector(".places__list");
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
const popupBigImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const formElement = document.querySelector(".popup__form");


// @todo: Вывести карточки на страницу
for(let i=0; i<initialCards.length; i=i+1) {
    cardList.append(cardCreation(initialCards[i].link, initialCards[i].name));
}

import './index.css';  //импорт главного файла стилей

addListeners(popupEdit);
addListeners(popupNewCard);
addListeners(popupBigImage);


editButton.addEventListener('click', function () {
    formElement.name.value = document.querySelector(".profile__title").textContent;
    formElement.description.value = document.querySelector(".profile__description").textContent;
    openModal(popupEdit);
})


cardList.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('card__image')) {
        const popupImage = popupBigImage.querySelector(".popup__image");
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        const popupCaption = popupBigImage.querySelector(".popup__caption");
        popupCaption.textContent = evt.target.alt;
        openModal(popupBigImage);
    }});

addButton.addEventListener('click', function() {
    openModal(popupNewCard);
})



// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
export function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const profileName = nameInput.value;
    const profileJob = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = profileName;
    profileDescription.textContent = profileJob;
    closeModal(popupEdit);
}

export const newPlaceForm = document.forms['new-place'];

export function newPlaceSubmit(evt) {
    evt.preventDefault();
    cardList.prepend(cardCreation(newPlaceForm['link'].value, newPlaceForm['place-name'].value));
    //newPlaceForm['place-name'].value="";
    //newPlaceForm['link'].value="";
    closeModal(popupNewCard);
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newPlaceSubmit);