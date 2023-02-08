import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, useFormWithValidation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const {handleChange, errors, isValid, setErrors, setValues, setIsValid } = useFormWithValidation();

  
  useEffect(() => {
    if (!isOpen) {
      setErrors({})
      setIsValid(true)
    }
  }, [isOpen])


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
    setValues({profileName: name, profileJob: description})
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  const errorProfileNameClass = `popup__error-text ${errors.hasOwnProperty('profileName') ? 'popup__error-text_active' : ''}`

  const errorProfileJobClass = `popup__error-text ${errors.hasOwnProperty('profileJob') ? 'popup__error-text_active' : ''}`

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      handleChange={handleChange}
      isValid={isValid}
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
      <span className={errorProfileNameClass}>{errors.profileName}</span>
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
      <span className={errorProfileJobClass}>{errors.profileJob}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
