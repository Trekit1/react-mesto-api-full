function PopupWithForm({
  name,
  onClose,
  children,
  buttonText,
  title,
  isOpen,
  onSubmit,
  handleChange,
  isValid
}) {

  const buttonClassName = `popup__save-button ${(!isValid) && 'popup__save-button_disable'}`;
  


  return (
    <div
      className={
        isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`
      }
    >
      <form
        className={`popup__container popup__container_${name}`}
        name={`${name}-form`}
        onSubmit={onSubmit}
        onChange={handleChange}
        noValidate
      >
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className={buttonClassName}disabled={isValid ? false : true}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;