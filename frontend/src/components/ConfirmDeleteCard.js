import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCard({ isOpen, onClose, card, onDeleteCard, name, title, buttonText, useFormWithValidation }) {

  const {handleChange, errors, isValid, setErrors, setIsValid } = useFormWithValidation();

  useEffect(() => {
    setIsValid(true)
  })

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card)
  }

  return (
    <PopupWithForm
        isOpen={isOpen}
        name={name}
        title={title}
        onClose={onClose}
        buttonText={buttonText}
        onSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
    />
  );
}

export default ConfirmDeleteCard;