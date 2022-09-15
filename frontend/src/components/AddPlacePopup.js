import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

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

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
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
      <span className="card-name-error  popup__error-text"></span>
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
      <span className="card-link-error  popup__error-text"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
