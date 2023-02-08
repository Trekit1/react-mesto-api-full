import PopupWithForm from "./PopupWithForm";
import { useRef, useState, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, useFormWithValidation }) {


  const {handleChange, errors, isValid, setErrors, setIsValid } = useFormWithValidation();

  const [avatar, setAvatar] = useState('')

  function handleChangeInput(evt) {
    setAvatar(evt.target.value)
  }


  useEffect(() => {
    if (!isOpen) {
      setErrors({})
      setAvatar('')
      setIsValid(false)
    }
  }, [isOpen])

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  const errorAvatarClass = `popup__error-text ${errors.hasOwnProperty('avatarLink') ? 'popup__error-text_active' : ''}`

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      handleChange={handleChange}
      isValid={isValid}
    >
      <input
        id="avatar-link"
        name="avatarLink"
        type="url"
        value={avatar}
        onChange={handleChangeInput}
        ref={avatarRef}
        className="popup__field popup__field_avatar_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className={errorAvatarClass}>{errors.avatarLink}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;