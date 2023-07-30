import React from "react";

function PopupWithForm({isOpen, onClose, name, title, buttonText, onSubmit, isLoading, children}) {

  function handleSubmitClick(e) {
    onSubmit(e);
  }
  
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" onClick={onClose} aria-label="Закрыть" className="popup__close-button"></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={handleSubmitClick} noValidate>
          {children}
          <button type="submit" className="popup__form-submit">{isLoading ? 'Сохранение...' : buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;