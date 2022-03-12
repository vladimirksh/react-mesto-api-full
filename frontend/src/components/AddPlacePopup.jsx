import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onUpdatePlace, isOpen, onClose }) {
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");

  //состояния для определения прикосновения инпутов
  const [placeDirty, setPlaceDirty] = useState(false);
  const [imageDirty, setImageDirty] = useState(false);
  //состояние для ошибок
  const [placeError, setPlaceError] = useState(true);
  const [imageError, setImageError] = useState(true);
  //состояние валидной формы
  const isFormValid = !placeError && !imageError;
  const buttonClassName = `popup__save popup__save_add-card ${
    isFormValid ? "" : "popup__save_inactive"
  }`;

  //меняем состояние посещения инпутов
  function handleBlur(e) {
    switch (e.target.name) {
      case `place`:
        setPlaceDirty(true);
        break;
      case `image`:
        setImageDirty(true);
        break;
    }
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
    if (!e.target.validity.valid) {
      setPlaceError(e.target.validationMessage);
    } else {
      setPlaceError("");
    }
  }

  function handleChangeImage(e) {
    setImage(e.target.value);
    if (!e.target.validity.valid) {
      setImageError(e.target.validationMessage);
    } else {
      setImageError("");
    }
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdatePlace(place, image);
  }

  return (
    <PopupWithForm
      name="_add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="place"
          value={place}
          onChange={handleChangePlace}
          onBlur={(e) => {
            handleBlur(e);
          }}
          id="place-input"
          className="popup__input popup__input_type_place"
          placeholder="Название"
          type="text"
          minLength="1"
          maxLength="30"
          required
        />
        {placeDirty && placeError && (
          <span className="name-input-error popup__input-error popup__input-error_active">
            {placeError}
          </span>
        )}
      </label>

      <label className="popup__field">
        <input
          name="image"
          value={image}
          onChange={handleChangeImage}
          onBlur={(e) => {
            handleBlur(e);
          }}
          id="image-input"
          className="popup__input popup__input_type_image"
          placeholder="Ссылка на картинку"
          type="url"
          required
        />
        {imageDirty && imageError && (
          <span className="name-input-error popup__input-error popup__input-error_active">
            {imageError}
          </span>
        )}
      </label>

      <button className={buttonClassName} type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
