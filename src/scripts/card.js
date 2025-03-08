// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;


export function deleteCard (card) {
    card.remove();
}

export function likeCard (likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}

function getCardTemplate() {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement
}
// @todo: Функция создания карточки
export function createCard(cSrc, cTitle) {
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
    return cardElement;
}

