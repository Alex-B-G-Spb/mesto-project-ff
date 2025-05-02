const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
    headers: {
      authorization: '76ecf00e-65e5-4b9d-8a92-c619e98bf2b7',
      'Content-Type': 'application/json'
    }
  };

  function request(endpoint, options) {
    const fullUrl = config.baseUrl + '/' + endpoint;

    return fetch(fullUrl, options).then(handleResponse);
  }

  export const getProfile = () => {
    return request(`users/me`, {
      method: "GET",
      headers: {
        authorization: config.headers.authorization,
      },
    })
  };

  export const getCards = () => {
    return request(`cards`, {
      method: "GET",
      headers: {
        authorization: config.headers.authorization,
      },
    })
  };

  export const updateProfile = (name, about) => {
    return request(`users/me`, {
      method: "PATCH",
      headers: {
        authorization: config.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    })
  };

  export const updateAvatar = (avatarUrl) => {
    return request(`users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: config.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
  };

  export const addCard = (name, link) => {
    return request(`cards`, {
      method: "POST",
      headers: {
        authorization: config.headers.authorization,
        "Content-Type": config.headers["Content-Type"],
      },
      body: JSON.stringify({ name, link }),
    })
  };

  export const deleteCardFromServer = (cardId) => {
    return request(`cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: config.headers.authorization,
      },
    })
  };

  export const addLike = (cardId) => {
    return request(`cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: config.headers.authorization,
      },
    })
  };

  export const removeLike = (cardId) => {
    return request(`cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: config.headers.authorization,
      },
    })
  };


  const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };