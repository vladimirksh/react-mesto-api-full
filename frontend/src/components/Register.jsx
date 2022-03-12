import { Link, withRouter } from "react-router-dom";
import React from "react";

const Register = ({
  handleRegister,
  email,
  password,
  emailDirty,
  passwordDirty,
  emailError,
  passwordError,
  handleBlur,
  handleChangeEmail,
  handleChangePassword,
}) => {
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    handleRegister(password, email);
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <h4 className="register__title">Регистрация</h4>
        <label className="register__field">
          <input
            className="register__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
            onBlur={handleBlur}
            value={email}
          />
          {emailDirty && emailError && (
            <div className="register__error">{emailError}</div>
          )}
        </label>

        <label className="register__field">
          <input
            className="register__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            onBlur={handleBlur}
            value={password}
          />
          {passwordDirty && passwordError && (
            <div className="register__error">{passwordError}</div>
          )}
        </label>

        <button className="register__submit" type="submit">
          Зарегестрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="register__link">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default withRouter(Register);
