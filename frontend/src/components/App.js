import React, {useState} from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header.js";
import Main from './Main.js';
import Footer from "./Footer.js";
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from "./ImagePopup.js";
import PopupWithConfirmation from './PopupWithConfirmation.js';
import InfoTooltip from './InfoTooltip.js';
import { api } from '../utils/Api.js';
import { register, authorization, checkToken } from '../utils/authApi.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Register from './Register.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false); 
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarProfileOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardDelete, setCardDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  //const [isChecking, setIsChecking] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      checkToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
         // setIsChecking(false);
          navigate("/");
      })
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
    }
  }, [])


  React.useEffect(() => {
    if(loggedIn) {
      api.getUserInfo()
      .then((res) => {
       setCurrentUser(res);
      })
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      });
  
      api.getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log("Ошибка страницы:", err);
        })
       // .finally(() => setIsChecking(false))
    }
   
  }, [loggedIn])

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        setCards((cards) => 
          cards.filter((item) => 
            item._id !== cardId)
        )
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((item) => 
            item._id === card._id ? newCard : item));
      })
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      });
  } 

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editUserInfo(data)
      .then((res) => {      
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.editAvatar(link)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister(data) {
    setRegistered(false);
    register(data.password, data.email)
      .then(() => {
        navigate('/sign-in');
        setRegistered(true);
      })
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
      .finally(() => setIsTooltipPopupOpen(true))
  }

  function handleAuthorization(data) {
    authorization(data.password, data.email)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          setUserEmail(data.email);
          setLoggedIn(true);
         // setIsChecking(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Ошибка страницы:", err);
      })
  }

  
  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
    setUserEmail("");
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setAvatarProfileOpen(false);
    setProfilePopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipPopupOpen(false);
  }

  function handleEditAvatarClick() {
    setAvatarProfileOpen(true);
  };

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleDeleteConfirmationClick(card) {
    setConfirmationPopupOpen(true);
    setCardDelete(card);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header email={userEmail} onLinkClick={signOut} />
      
        <Routes>
          <Route path="/sign-in" element={<Login 
            onAuthorization={handleAuthorization}
            />} 
          />
          <Route path="/sign-up" element={<Register 
            onRegister={handleRegister}
            />} 
          />
          <Route path="/" element={<ProtectedRoute 
            loggedIn={loggedIn} 
            element={Main}
            initialCards={cards}
            onCardClick={setSelectedCard} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardDelete={handleDeleteConfirmationClick}
            onCardLike={handleCardLike}
            />} 
          />    
          <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"}/>} />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          isLoading={isLoading}
        />
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
        <PopupWithConfirmation 
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          card={cardDelete}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
          title="Вы уверены?"
          buttonText="Да"
        />
        <InfoTooltip 
        isOpen={isTooltipPopupOpen}
        onClose={closeAllPopups}
        isRegistered={registered}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
