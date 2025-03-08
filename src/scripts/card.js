import { cardTemplate, cardList } from "../index.js";

export function cardRemove (card) {
    card.remove();
}

export function likeCard (likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}
// @todo: Функция создания карточки
export function cardCreation(cSrc, cTitle) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cSrc;
    cardImage.alt = cTitle;
    cardTitle.textContent = cTitle;
    cardButton.addEventListener("click", () => cardRemove(cardElement));
    likeButton.addEventListener("click", () =>  likeCard(likeButton));
    return cardElement;
}

