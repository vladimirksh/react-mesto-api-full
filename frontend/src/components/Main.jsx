import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__main-info">
            <div
              className="profile__avatar"
              style={{
                backgroundImage: `url(${
                  props.isLoadingInitialData ? null : currentUser.avatar
                })`,
              }}
            >
              <button
                className="profile__editavatar"
                onClick={props.onEditAvatar}
              ></button>
            </div>
            <div className="profile__info">
              <div className="profile__text">
                <h1 className="profile__name">
                  {props.isLoadingInitialData
                    ? "Загрузка..."
                    : currentUser.name}
                </h1>
                <button
                  className="profile__editbutton"
                  type="button"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__about">
                {props.isLoadingInitialData ? "Загрузка..." : currentUser.about}
              </p>
            </div>
          </div>
          <button
            className="profile__addbutton"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="post">
          <ul className="cards-container">
            {props.isLoadingInitialData
              ? null
              : props.cards.map((item) => (
                  <Card
                    key={item._id}
                    id={item._id}
                    onClose={props.onClose}
                    card={item}
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                  />
                ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
