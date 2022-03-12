import React, { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef();
  const [image, setImage] = useState("");
  //состояния для определения прикосновения инпутов
  const [imageDirty, setImageDirty] = useState(false);
  //состояние для ошибок
  const [imageError, setImageError] = useState("");
  //состояние валидной формы
  const [formValid, setFormValid] = useState(false);
  const buttonClassName = `popup__save popup__save_add-card ${
    formValid ? "" : "popup__save_inactive"
  }`;

  //меняем состояние посещения инпутов
  function handelBlur(e) {
    switch (e.target.name) {
      case `image`:
        setImageDirty(true);
        break;
    }
  }

  function handleChangeImage(e) {
    setImage(e.target.value);
    if (!e.target.validity.valid) {
      setImageError(e.target.validationMessage);
      setFormValid(false);
    } else {
      setImageError("");
      setFormValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      name="_change-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          name="image"
          ref={inputRef}
          id="img-input"
          value={image}
          onChange={handleChangeImage}
          onBlur={handelBlur}
          className="popup__input popup__input_type_avatar"
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
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
