// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function cardCreation(cSrc, cTitle) {
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    let cardImage = cardElement.querySelector('.card__image');
    let cardTitle = cardElement.querySelector('.card__title');
    let cardButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cSrc;
    cardImage.alt = cTitle;
    cardTitle.textContent = cTitle;
    cardButton.addEventListener("click", cardRemove);
    cardList.append(cardElement);
}
// @todo: Функция удаления карточки
function cardRemove (event) {
    let cardButtonClicked = event.target;
    let cardToRemove = cardButtonClicked.parentElement;
    cardToRemove.remove();
}
// @todo: Вывести карточки на страницу
for(let i=0; i<initialCards.length; i=i+1) {
    cardCreation(initialCards[i].link, initialCards[i].name);
}
