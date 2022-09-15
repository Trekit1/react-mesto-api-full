import success from "../images/Success.svg";
import decline from "../images/Decline.svg";

function InfoTooltip({ name, onClose, isOpen, isInfoTooltipKind }) {
  return (
    <div
      className={
        isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`
      }
    >
      <form
        className={`popup__container popup__container_${name}`}
        name={`${name}-form`}
      >
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          src={isInfoTooltipKind ? success : decline}
          className="popup__image"
        />
        <h2 className="popup__title popup__title_infoTooltip">
          {isInfoTooltipKind
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </form>
    </div>
  );
}

export default InfoTooltip;
