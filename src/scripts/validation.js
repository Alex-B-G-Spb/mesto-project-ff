 //enableValidation({
 //   formSelector: '.popup__form',
 //    inputSelector: '.popup__input',
 //   submitButtonSelector: '.popup__button',
 //   inactiveButtonClass: 'popup__button_disabled',
 //   inputErrorClass: 'popup__input_type_error',
 //   errorClass: 'popup__error_visible'
 // });

export function clearValidation (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);
    hideInputError(inputElement, formError);
  });
  buttonElement.disabled = false;
  buttonElement.classList.remove('popup__button_disabled');
}

function showInputError (formInput, formError, errorMessage) {
  formInput.classList.add("popup__input_type_error");
  formError.classList.add('popup__error_visible');
  formError.textContent = errorMessage;
}
  
function hideInputError (formInput, formError) {
  formInput.classList.remove("popup__input_type_error");
  formError.classList.remove('popup__error_visible');
  formError.textContent = "";
}

function isValid (formElement, formInput) {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
  } else {
    formInput.setCustomValidity("");
  }

  if (!formInput.validity.valid) {
    showInputError(formInput, formError, formInput.validationMessage);
  } else {
    hideInputError(formInput, formError);
  }
};

function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
});
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add('popup__button_disabled');
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button_disabled');
    }
};