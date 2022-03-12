import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import api from "../utils/api";
import { register, authorize, checkToken } from "../utils/auth.js";

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const history = useHistory();

  //состояния для логина и пароля
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //состояния для определения прикосновения инпутов
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  //состояние для ошибок
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  //меняем состояние посещения инпутов
  function handleBlur(e) {
    switch (e.target.name) {
      case `email`:
        setEmailDirty(true);
        break;
      case `password`:
        setPasswordDirty(true);
        break;
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    if (!e.target.validity.valid) {
      setEmailError(e.target.validationMessage);
    } else {
      setEmailError("");
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (!e.target.validity.valid) {
      setPasswordError(e.target.validationMessage);
    } else {
      setPasswordError("");
    }
  }

  useEffect(() => {
    handleTokenCheck()
      .then(() => {
        // все хорошо, токен актуальный, можно делать запрос на получение данных
        Promise.all([
          //в Promise.all передаем массив промисов которые нужно выполнить
          api.getUserData(`Bearer ${localStorage.getItem("jwt")}`),
          api.getCards(`Bearer ${localStorage.getItem("jwt")}`),
        ])
          .then((values) => {
            setCurrentUser(values[0]);
            setCards(values[1]);
          })
          .catch((err) => {
            //попадаем сюда если один из промисов завершаться ошибкой
            console.log(err);
          });
      })
      .catch((err) => {
        // токена нет.... как-нибудь обрабатываем ошибку
        console.error(err);
      });
  }, []);

  function handleTokenCheck() {
    return new Promise((resolve, reject) => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        // резолвим новый промис
        resolve(
          checkToken(jwt).then((res) => {
            setLoggedIn(true);
            history.push("/main");
          })
        );
      } else {
        // режектим промис (это попадет в catch) при вызове текущей функции
        reject("JWT is not actual");
      }
    });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(
        card._id,
        !isLiked,
        `Bearer ${localStorage.getItem("jwt")}`
      )
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    const isOwner = card.owner === currentUser._id;
    if (isOwner) {
      api
        .deleteCard(card._id, `Bearer ${localStorage.getItem("jwt")}`)
        .then(() => {
          setCards(cards.filter((i) => i._id !== card._id));
        })
        .catch((err) => console.log(err));
    }
  }

  function handleUpdateUser(userName, userAbout) {
    api
      .patchUserData(
        userName,
        userAbout,
        `Bearer ${localStorage.getItem("jwt")}`
      )
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .patchUserAvatar(userAvatar, `Bearer ${localStorage.getItem("jwt")}`)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(place, image) {
    api
      .postCard(place, image, `Bearer ${localStorage.getItem("jwt")}`)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(password, email) {
    register(password, email)
      .then((data) => {
        console.log(data);
        setIsInfoTooltipOpen(true);
        if (data) {
          setMessage(true);
          history.push("/sign-in");
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(password, email) {
    authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/main");
          return data;
        }
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function editProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function addPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function editAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            onEditProfile={editProfilePopupOpen}
            onAddPlace={addPlacePopupOpen}
            onEditAvatar={editAvatarPopupOpen}
            onClose={closeAllPopups}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
          />

          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
              email={email}
              password={password}
              emailDirty={emailDirty}
              passwordDirty={passwordDirty}
              emailError={emailError}
              passwordError={passwordError}
              handleBlur={handleBlur}
              handleChangeEmail={handleChangeEmail}
              handleChangePassword={handleChangePassword}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
              email={email}
              password={password}
              emailDirty={emailDirty}
              passwordDirty={passwordDirty}
              emailError={emailError}
              passwordError={passwordError}
              handleBlur={handleBlur}
              handleChangeEmail={handleChangeEmail}
              handleChangePassword={handleChangePassword}
            />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          message={message}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
