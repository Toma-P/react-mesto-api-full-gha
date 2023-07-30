import regOk from '../images/popup-tooltip-ok.svg';
import regError from '../images/popup-tooltip-err.svg';

function InfoTooltip({isOpen, onClose, isRegistered}) {
  return (
    <section className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button 
          type="button" 
          aria-label="Закрыть" 
          onClick={onClose} 
          className="popup__close-button"
        >
        </button>
        {isRegistered ? 
        <>
        <img className="popup__tooltip-image" src={regOk} alt="Успешная регистрация"/>
        <p className="popup__tooltip-title">Вы успешно зарегистрировались!</p>
        </>
        : 
        <>
        <img className="popup__tooltip-image" src={regError} alt="Ошибка регистрации"/>
        <p className="popup__tooltip-title">Что-то пошло не так! Попробуйте еще раз.</p>   
        </>
        }
      </div>
    </section>
  )
}
    
export default InfoTooltip;