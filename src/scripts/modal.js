

function closeModalWithEsc(evt) {
    if (evt.key === "Escape") {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalWithEsc);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalWithEsc);
}

function closeByClick (popup, className) {
    popup.addEventListener("mousedown", function(evt) {
        if (evt.target.classList.contains(className)) {
            closeModal(popup);
        }
    })
}

export function addClosePopupListeners(popup) {
    closeByClick(popup, "popup");
    closeByClick(popup, "popup__close");
}