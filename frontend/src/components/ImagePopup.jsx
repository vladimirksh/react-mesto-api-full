import React from "react";

function ImagePopup(props) {

  const className = 
  `popup
   popup_zoom-image
   ${props.card ? 'popup_open' : ''}`
   
  return(
<div className={className}>
  <div className="popup__background"
  onClick={props.onClose}></div>
  <div className="popup__content">
    <button
    className="popup__close popup__close-zoom"
    type="button"
    onClick={props.onClose}></button>
    <div className="popup__body-zoom">
    <img className="popup__image" src={`${props.card}`} alt={props.name} />
    <p className="popup__text"></p>
    </div>
  </div>
</div>
  )
}

export default ImagePopup;