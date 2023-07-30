import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  } 

  return (
    <PopupWithForm 
      type="popup"
      isOpen={isOpen}
      onClose={onClose}  
      name="add-card" 
      title="Новое место" 
      buttonText="Создать"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__form-field">
        <input 
          type="text" 
          className="popup__form-item popup__form-item_type_name" 
          name="name" 
          minLength="2" 
          maxLength="30" 
          value={name} 
          onChange={handleNameChange} 
          placeholder="Название" 
          required 
        />
        <span className="popup__form-error"></span>
      </label>
      <label className="popup__form-field">
        <input 
          type="url" 
          className="popup__form-item popup__form-item_type_link" 
          name="link" 
          value={link} 
          onChange={handleLinkChange} 
          placeholder="Ссылка на картинку" 
          required 
        />
        <span className="popup__form-error"></span>
      </label>
    </PopupWithForm>
  )
}
  
export default AddPlacePopup;