import React, {useState, useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      type="popup"
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile" 
      title="Редактировать профиль" 
      buttonText="Сохранить"
      onSubmit={handleSubmit} 
      isLoading={isLoading}    
    >
      <label className="popup__form-field">
        <input 
          type="text" 
          className="popup__form-item popup__form-item_type_username" 
          name="name" 
          minLength="2" 
          maxLength="40" 
          value={name || ''} 
          onChange={handleNameChange} 
          placeholder="Имя пользователя" 
          required 
        />
        <span className="popup__form-error"></span>
        </label>
      <label className="popup__form-field">
        <input 
          type="text" 
          className="popup__form-item popup__form-item_type_about" 
          name="about" 
          minLength="2" 
          maxLength="200" 
          value={description || ''} 
          onChange={handleDescriptionChange} 
          placeholder="Немного о себе" 
          required 
        />
        <span className="popup__form-error"></span>
      </label>
    </PopupWithForm>
  )
}
  
export default EditProfilePopup;