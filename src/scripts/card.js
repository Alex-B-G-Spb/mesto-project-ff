import { openModal } from "./modal";
export const cardTemplate = document.querySelector('#card-template').content;
export const popupBigImage = document.querySelector('.popup_type_image');

function deleteCard (card) {
    card.remove();
}

function likeCard (likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}

function openImagePopup(cardImage) {
        const popupImage = popupBigImage.querySelector(".popup__image");
        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        const popupCaption = popupBigImage.querySelector(".popup__caption");
        popupCaption.textContent = cardImage.alt;
        openModal(popupBigImage);
    };


function getCardTemplate() {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement
}
// @todo: Функция создания карточки
export function createCard(cSrc, cTitle, $deleteCard, $likeCard, $openImagePopup) {
    const cardElement=getCardTemplate();
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cSrc;
    cardImage.alt = cTitle;
    cardTitle.textContent = cTitle;
    cardButton.addEventListener("click", () => deleteCard(cardElement));
    likeButton.addEventListener("click", () =>  likeCard(likeButton));
    cardImage.addEventListener("click", () =>  openImagePopup(cardImage))
    return cardElement;
}

