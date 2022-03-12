import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //состояния для определения прикосновения инпутов
  const [nameDirty, setNameDirty] = useState(false);
  const [descriptionDirty, setDescriptionDirty] = useState(false);
  //состояние для ошибок
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  //состояние валидной формы

  const [formValid, setFormValid] = useState(false);
  const buttonClassName = `popup__save popup__save-change ${
    formValid ? "" : "popup__save_inactive"
  }`;

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  useEffect(() => {
    if (nameError || descriptionError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, descriptionError]);

  function handleChangeName(e) {
    setName(e.target.value);
    //проверяем наш инпут на валидность
    if (!e.target.validity.valid) {
      setNameError(e.target.validationMessage);
    } else {
      setNameError("");
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    //проверяем наш инпут на валидность
    if (!e.target.validity.valid) {
      setDescriptionError(e.target.validationMessage);
    } else {
      setDescriptionError("");
    }
  }
  //меняем состояние посещения инпутов
  function handleBlur(e) {
    switch (e.target.name) {
      case `name`:
        setNameDirty(true);
        break;
      case `about`:
        setDescriptionDirty(true);
        break;
    }
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="-change"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={name || ""}
          name="name"
          onChange={handleChangeName}
          onBlur={(e) => {
            handleBlur(e);
          }}
          id="name-input"
          className="popup__input popup__input_type_name"
          type="text"
          minLength="2"
          maxLength="40"
          required
        />
        {nameDirty && nameError && (
          <span className="name-input-error popup__input-error popup__input-error_active">
            {nameError}
          </span>
        )}
      </label>

      <label className="popup__field">
        <input
          value={description || ""}
          name="about"
          onChange={handleChangeDescription}
          onBlur={(e) => {
            handleBlur(e);
          }}
          id="about-input"
          className="popup__input popup__input_type_about"
          type="text"
          minLength="2"
          maxLength="200"
          required
        />
        {descriptionDirty && descriptionError && (
          <span className="name-input-error popup__input-error popup__input-error_active">
            {descriptionError}
          </span>
        )}
      </label>

      <button className={buttonClassName} type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
