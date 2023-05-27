import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    avatar: '../images/loader.gif',
    name: 'Загрузка',
    about: 'Загрузка',
    _id: ''
  });
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardId, setCardId] = React.useState('');

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch
      ((error) => {
        console.log(error)
      });
  }, []);

  function handleUpdateUser(newUserData) {
    api.setUserInfo(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => closeAllPopups());
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => closeAllPopups());
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleUpdateAvatar(avatar) {
    api.updateUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleEscPress(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
    document.addEventListener('keydown', handleEscPress);
    document.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        closeAllPopups();
      }
    });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    document.addEventListener('keydown', handleEscPress);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
    document.addEventListener('keydown', handleEscPress);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
  }

  function handleCardDelete() {
    api.deleteUserCard(cardId)
      .then((res) => {
        const newCard = cards.filter((item) => item._id !== cardId);
        setCards(newCard);
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleDeletePlaceClick(card) {
    setCardId(card);
    setConfirmDeletePopupOpen(true);
    document.addEventListener('keydown', handleEscPress);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    document.removeEventListener('keydown', handleEscPress);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="Root">
        <div className="page">
          <Header/>
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDeleteClick={handleDeletePlaceClick}
          />
          <Footer/>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups}
                              onConfirmDelete={handleCardDelete}/>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
