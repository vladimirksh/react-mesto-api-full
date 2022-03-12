class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {...this._headers,
      authorization: token
      }
    })
      .then(this._getResponse);
  }

  getUserData(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers:  {...this._headers,
        authorization: token
        }
    })
      .then(this._getResponse);
  }

  patchUserData(userName, userAbout, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {...this._headers,
        authorization: token
        },
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(this._getResponse)
  }

  postCard(place, image, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {...this._headers,
        authorization: token
        },
      body: JSON.stringify({
        name: place,
        link: image
      })
    })
      .then(this._getResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {...this._headers,
        authorization: token
        }
    })
      .then(this._getResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {...this._headers,
          authorization: token
          }
      })
        .then(this._getResponse);
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {...this._headers,
          authorization: token
          }
      })
        .then(this._getResponse);
    }

  }

  patchUserAvatar(image, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {...this._headers,
        authorization: token
        },
      body: JSON.stringify({
        avatar: image
      })
    })
      .then(this._getResponse);
  }
}

const api = new Api({
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})
export default api;