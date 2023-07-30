import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({initialCards, onCardClick, onEditProfile, onAddPlace, onEditAvatar, onCardDelete, onCardLike}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={currentUser.avatar} alt="Жак-Ив Кусто"/>
          <button type="button" onClick={onEditAvatar} area-label="Изменить аватар" className="profile__avatar-button"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button type="button" onClick={onEditProfile} aria-label="Редактировать данные" className="profile__info-button"></button>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button type="button" onClick={onAddPlace} aria-label="Добавить новую фотографию" className="profile__add-button"></button>
      </section>
      <section className="cards">
        <ul className="cards__grid">
          {initialCards.map((card) => {
            return <Card 
              key={card._id} 
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;