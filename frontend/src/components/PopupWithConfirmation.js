import React from "react";

function PopupWithConfirmation({isOpen, onClose, card, onCardDelete, isLoading, title, buttonText}) {

  function handleButtonClick() {
    onCardDelete(card._id);
  }
  return (
    <section className={`popup popup_type_delete ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button 
          type="button" 
          aria-label="Закрыть" 
          onClick={onClose} 
          className="popup__close-button"
        >
        </button>
        <h2 className="popup__title">{title}</h2>
        <button 
          type="button" 
          aria-label="Подтвердить удаление" 
          onClick={handleButtonClick} 
          className="popup__form-submit">
            {isLoading ? 'Сохранение...' : buttonText}
        </button>
      </div>
    </section>
  )
}
  
export default PopupWithConfirmation;