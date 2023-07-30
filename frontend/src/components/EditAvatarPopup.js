import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const avatarLinkRef = React.useRef();

  React.useEffect(() => {
    avatarLinkRef.current.value='';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarLinkRef.current.value);
  } 

  return (
    <PopupWithForm 
    type="popup"
    isOpen={isOpen}
    onClose={onClose} 
    name="edit-avatar" 
    title="Обновить аватар" 
    buttonText="Сохранить"
    onSubmit={handleSubmit}
    isLoading={isLoading}
    >
      <label className="popup__form-field">
        <input 
          type="url" 
          className="popup__form-item popup__form-item_type_link" 
          name="link" 
          ref={avatarLinkRef}  
          placeholder="Ссылка на картинку" 
          required 
        />
        <span className="popup__form-error"></span>
      </label>
    </PopupWithForm>
  )
}
    
export default EditAvatarPopup;