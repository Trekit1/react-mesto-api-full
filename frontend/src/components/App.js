import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCard from "./ConfirmDeleteCard";
import Register from "./Register";
import Login from "./LogIn";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteAuth from "./ProtectedRouteAuth";
import ErrorNotFound from "./ErrorNotFound";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [isInfoTooltipKind, setInfoTooltipKind] = useState(false);
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const history = useHistory();


  function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

  
    const handleChange = (event) => {
  
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    };

    return { values, handleChange, errors, isValid, setValues, setErrors, setIsValid };
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  }

  //закрытие попапов по esc
  const isOpen =
    isEditAvatarPopupOpen ||
    isInfoTooltip ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isDeleteCardPopupOpen ||
    selectedCard.link;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleOnDeleteCard() {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen)
  }

  function handleUpdateUser(data) {
    api
      .changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .changeUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function authoriz(token) {
    const content = auth.getContent(token).then((res) => {
      if (res) {
        setLoggedIn(true);
        setUserData({
          email: res.email,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
    return content;
  }

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, userInfo]) => {
        setCards(cards);
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authoriz(token);
    }
  }, [loggedIn]);

  function getOut() {
    localStorage.removeItem("token");
    api.deleteHeaders();
    setLoggedIn(false);
    history.push("/signin");
  }

  function userAuthorization(email, password) {
    auth
      .authorization(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        const token = localStorage.getItem('token')
        api.updateHeaders(token)
      })
      .then((res) => {
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function userRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
          setInfoTooltipKind(true);
          setInfoTooltip(true);
        })
      .catch((err) => {
        setInfoTooltipKind(false);
        setInfoTooltip(true);
        console.log(err);
      });
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header getOut={getOut} userData={userData} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleOnDeleteCard}
            setCard={setCard}
            cards={cards}
            onCardLike={handleCardLike}
            loggedIn={loggedIn}
          />
          <ProtectedRouteAuth exact path="/signup" component={Register} loggedIn={loggedIn} userRegister={userRegister}/>
          <ProtectedRouteAuth exact path="/signin" component={Login} loggedIn={loggedIn} setLoggedIn={setLoggedIn} userAuthorization={userAuthorization}/>
          <Route>
                <ErrorNotFound/>
          </Route>
        </Switch>
        <Footer />
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          useFormWithValidation={useFormWithValidation}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          useFormWithValidation={useFormWithValidation}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          useFormWithValidation={useFormWithValidation}
        />

        <ConfirmDeleteCard
          useFormWithValidation={useFormWithValidation}
          isOpen={isDeleteCardPopupOpen}
          card={card}
          onDeleteCard={handleCardDelete}
          name="confirm"
          title="Вы уверены?"
          onClose={closeAllPopups}
          buttonText="Да"
        />


        <InfoTooltip
          name="infoTooltip"
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isInfoTooltipKind={isInfoTooltipKind}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
