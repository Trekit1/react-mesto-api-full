import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCard({ isOpen, onClose, card, onDeleteCard, name, title, buttonText }) {

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
    />
  );
}

export default ConfirmDeleteCard;