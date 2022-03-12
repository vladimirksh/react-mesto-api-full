import React from "react";

function PopupWithForm(props) {
  const className = `popup
   popup${props.name} 
   ${props.isOpen ? "popup_open" : ""}`;

  return (
    <>
      <div className={className}>
        <div className="popup__background" onClick={props.onClose}></div>
        <div className="popup__content">
          <button
            className="popup__close popup__close_add-card"
            type="button"
            onClick={props.onClose}
          ></button>
          <form
            onSubmit={props.onSubmit}
            className="popup__body popup__body_add-card"
            name="createcard"
            noValidate
          >
            <fieldset className="popup__set">
              {props.title ? (
                <h4 className="popup__title">{props.title}</h4>
              ) : (
                ""
              )}
              {props.children}
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
