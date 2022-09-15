import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        id="profile-name"
        name="profileName"
        type="text"
        className="popup__field popup__field_profile_name"
        value={name || ""}
        onChange={handleChangeName}
        placeholder="Имя профиля"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="profile-name-error  popup__error-text"></span>
      <input
        id="profile-job"
        name="profileJob"
        type="text"
        className="popup__field popup__field_profile_job"
        value={description || ""}
        onChange={handleChangeDescription}
        placeholder="О пользователе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="profile-job-error  popup__error-text"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
