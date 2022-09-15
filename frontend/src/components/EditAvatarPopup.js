import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="avatar-link"
        name="avatarLink"
        type="url"
        ref={avatarRef}
        className="popup__field popup__field_avatar_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="avatar-link-error  popup__error-text"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
