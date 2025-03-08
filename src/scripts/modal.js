

function closeModalWithEsc(evt) {
    if (evt.key === "Escape") {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', closeModalWithEsc);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalWithEsc);
}

export function addListeners(popup) {
    popup.addEventListener("mousedown", function(evt) {
        if (evt.target.classList.contains("popup")) {
            closeModal(popup);
        }
    })

    popup.addEventListener("mousedown", function(evt) {
        if (evt.target.classList.contains("popup__close")) {
            closeModal(popup);
        }
    })
}