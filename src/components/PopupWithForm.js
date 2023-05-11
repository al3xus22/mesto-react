import React from "react";

function PopupWithForm({name, title, isOpen, onClose, textButton, children}) {
  return (
    <dvi className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_${name}`}>
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form noValidate name={name} className={`popup__form popup__form_${name}`}>
          {children}
          <button className={`popup__button-submit popup__button-submit_${name}`} type="submit">{textButton}</button>
        </form>
      </div>
    </dvi>
  );
}

export default PopupWithForm;