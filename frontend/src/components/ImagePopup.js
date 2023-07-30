function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_open-image ${card && 'popup_opened'}`}>
      <figure className="popup__image-container">
        <button type="button" onClick={onClose} aria-label="Закрыть" className="popup__close-button"></button>
        <img className="popup__image" src={card && card.link} alt={card && card.name}/>
        <figcaption className="popup__caption">{card && card.name}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup;