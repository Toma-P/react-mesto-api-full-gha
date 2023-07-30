import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`); 

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  return (
    <li className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick}/>
      <h2 className="card__title">{props.card.name}</h2>
      <div className="card__likes">
        <button type="button" aria-label="Нравится" className={cardLikeButtonClassName} onClick={handleLikeClick} />
        <p className="card__like-count">{props.card.likes.length}</p>
      </div>
      {isOwn && <button type="submit" aria-label="Удалить" className="card__delete-button" onClick={handleDeleteClick}/>}
    </li>
  )
}

export default Card;