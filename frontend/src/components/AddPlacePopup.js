import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, useFormWithValidation }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const {handleChange, errors, isValid, setErrors, setIsValid } = useFormWithValidation();

  useEffect(() => {
    if (!isOpen) {
      setErrors({})
      setCardName('')
      setCardLink('')
      setIsValid(false)
    }
  }, [isOpen])

  function handleCardName(e) {
    setCardName(e.target.value);
  }

  function handleCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  const errorCardNameClass = `popup__error-text ${errors.hasOwnProperty('cardName') ? 'popup__error-text_active' : ''}`

  const errorCardLinkClass = `popup__error-text ${errors.hasOwnProperty('cardLink') ? 'popup__error-text_active' : ''}`

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      handleChange={handleChange}
      isValid={isValid}
    >
      <input
        id="card-name"
        name="cardName"
        value={cardName}
        onChange={handleCardName}
        type="text"
        className="popup__field popup__field_card_name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className={errorCardNameClass}>{errors.cardName}</span>
      <input
        id="card-link"
        name="cardLink"
        type="url"
        className="popup__field popup__field_card_link"
        value={cardLink}
        onChange={handleCardLink}
        placeholder="Ссылка на картинку"
        required
      />
      <span className={errorCardLinkClass}>{errors.cardLink}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;