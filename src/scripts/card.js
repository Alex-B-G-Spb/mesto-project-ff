
import {addLike, removeLike, deleteCardFromServer} from "./api"

export function deleteCard (card, cardId) {
    deleteCardFromServer(cardId)
    .then((data) => {
      if (data.message === "Пост удалён") {
        if (card) {
          card.remove();
        } else {
          console.log(`Элемент с ID ${cardId} не найден на странице`);
        }
      }}
    )
    .catch((err) => {
      console.log("Ошибка", err);
    });
}

export function likeCard (likeCounter, likeButton, cardElement, cardData, userId) {
    const isLiked = cardData.likes.some(function (like) {
      return like._id === userId;
    });
  
    if (isLiked) {
      removeLike(cardData._id)
        .then((card) => {
          likeButton.classList.remove("card__like-button_is-active");
          likeCounter.textContent = card.likes.length;
          cardData.likes = card.likes;
        })
        .catch((err) => {
          console.log("Ошибка удаления лайка", err);
        });
    } else {
      addLike(cardData._id)
        .then((card) => {
          likeButton.classList.add("card__like-button_is-active");
          likeCounter.textContent = card.likes.length;
          cardData.likes = card.likes;
        })
        .catch((err) => {
          console.log("Ошибка добавления лайка", err);
        });
    }
}

function getCardTemplate() {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  return cardElement
}

export function createCard(cardData, deleteCard, likeCard, openImagePopup, userId) {
    const cardElement=getCardTemplate();
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    if (cardData.owner._id === userId) {
        deleteButton.style.opacity = 1;
        cardButton.addEventListener("click", () => deleteCard(cardElement, cardData._id));
      } else {
        deleteButton.style.opacity = 0;
      }

    likeButton.addEventListener("click", () =>  likeCard(likeCounter, likeButton, cardElement, cardData, userId));
    if (cardData.likes.some((like) => like._id===userId)) {
      likeButton.classList.add("card__like-button_is-active");
    }
    cardImage.addEventListener("click", () =>  openImagePopup(cardImage))
    return cardElement;
}

