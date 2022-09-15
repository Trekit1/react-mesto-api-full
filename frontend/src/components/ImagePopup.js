function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        card.link ? "popup popup_photo popup_opened" : "popup popup_photo"
      }
    >
      <form className="popup__photo-container" name="photo-form">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt="Картинка" className="popup__photo-image" />
        <h2 className="popup__photo-name">{card.name}</h2>
      </form>
    </div>
  );
}

export default ImagePopup;
