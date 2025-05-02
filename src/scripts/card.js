import { openModal } from "./modal";
import { openImagePopup, userId } from "..";
import {addLike, removeLike, deleteCardFromServer} from "./api"
export const cardTemplate = document.querySelector('#card-template').content;


export function deleteCard (card, cardId) {
    deleteCardFromServer(cardId)
    .then((data) => {
      if (data.message === "Пост удалён") {
        const cardElement = document.querySelector(
          `.card[data-id="${cardId}"]`
        );

        if (cardElement) {
          cardElement.remove();
        } else {
          console.log(`Элемент с ID ${cardId} не найден на странице`);
        }
      }}
    )
    .catch((err) => {
      console.log("Ошибка", err);
    });
    card.remove();
}

export function likeCard (likeButton, cardElement, cardData) {
    const likeCounter = cardElement.querySelector(".card__like-counter");
    const cardId = cardData._id;
    const isLiked = cardData.likes.some(function (like) {
      return like._id === userId;
    });
  
    if (isLiked) {
      removeLike(cardId)
        .then((card) => {
          likeButton.classList.remove("card__like-button_is-active");
          likeCounter.textContent = card.likes.length;
          cardData.likes = card.likes;
        })
        .catch((err) => {
          console.log("Ошибка удаления лайка", err);
        });
    } else {
      addLike(cardId)
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

    likeButton.addEventListener("click", () =>  likeCard(likeButton, cardElement, cardData));
    cardImage.addEventListener("click", () =>  openImagePopup(cardImage))
    return cardElement;
}

