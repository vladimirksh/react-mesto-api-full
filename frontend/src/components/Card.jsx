import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ` element__like ${
    isLiked && "element__like_active"
  }`;

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? "element__delete" : "element__delete_hiden"
  }`;

  function handleCardClick() {
    props.onCardClick(props.card.link);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <>
      <li className="element">
        <button
          className={cardDeleteButtonClassName}
          type="button"
          onClick={handleDeleteClick}
        ></button>
        <img
          className="element__image"
          src={`${props.card.link}`}
          alt={props.name}
          onClick={handleCardClick}
        />
        <div className="element__signature">
          <p className="element__title">{props.card.name}</p>
          <div className="element__like-box">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            ></button>
            <p className="element__likes-count">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
