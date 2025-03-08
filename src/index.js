
import {initialCards} from './scripts/cards.js'
import { createCard, cardTemplate, } from './scripts/card.js';
import { openModal, closeModal, addClosePopupListeners } from './scripts/modal.js';

const cardList = document.querySelector(".places__list");
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupBigImage = document.querySelector('.popup_type_image');
const buttonOpenEditProfileForm = document.querySelector(".profile__edit-button");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");

const formEditProfile = document.querySelector(".popup__form");


// @todo: Вывести карточки на страницу
for(let i=0; i<initialCards.length; i=i+1) {
    cardList.append(createCard(initialCards[i].link, initialCards[i].name));
}

import './index.css';  //импорт главного файла стилей

addClosePopupListeners(popupEditProfile);
addClosePopupListeners(popupNewCard);
addClosePopupListeners(popupBigImage);


buttonOpenEditProfileForm.addEventListener('click', function () {
    formEditProfile.name.value = document.querySelector(".profile__title").textContent;
    formEditProfile.description.value = document.querySelector(".profile__description").textContent;
    openModal(popupEditProfile);
})

//слушатель на все карточки через родительский элемент
cardList.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('card__image')) {
        const popupImage = popupBigImage.querySelector(".popup__image");
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        const popupCaption = popupBigImage.querySelector(".popup__caption");
        popupCaption.textContent = evt.target.alt;
        openModal(popupBigImage);
    }});

    buttonOpenAddCardForm.addEventListener('click', function() {
    openModal(popupNewCard);
})



// Находим поля формы в DOM
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function submitEditProfileForm(evt) {
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
    closeModal(popupEditProfile);
}

const newPlaceForm = document.forms['new-place'];

function submitAddCardForm(evt) {
    evt.preventDefault();
    cardList.prepend(createCard(newPlaceForm['link'].value, newPlaceForm['place-name'].value));
    //newPlaceForm['place-name'].value="";
    //newPlaceForm['link'].value="";
    closeModal(popupNewCard);
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', submitEditProfileForm);
newPlaceForm.addEventListener('submit', submitAddCardForm);