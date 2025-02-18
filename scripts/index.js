// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function cardCreation(cSrc, cTitle) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cSrc;
    cardImage.alt = cTitle;
    cardTitle.textContent = cTitle;
    cardButton.addEventListener("click", () => cardRemove(cardElement)); 
    return cardElement;
}
// @todo: Функция удаления карточки
function cardRemove (card) {
    card.remove();
}
// @todo: Вывести карточки на страницу
for(let i=0; i<initialCards.length; i=i+1) {
    cardList.append(cardCreation(initialCards[i].link, initialCards[i].name));
}
