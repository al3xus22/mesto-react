import React from 'react';
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  function handleEscPress(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    document.removeEventListener('keydown', handleEscPress);
    setSelectedCard({});
  }

  return (
    <div className="Root">
      <div className="page">
        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}/>
        <Footer/>

        <PopupWithForm
          name="profile-edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          textButton="Сохранить"
        >
          <fieldset className="popup__inputs">
            <label htmlFor="name-input" className="popup__label">
              <input type="text" id="name-input" placeholder="Имя" name="name"
                     className="popup__input popup__input_type_name" required
                     minLength="2" maxLength="40"/>
              <span className="name-input-error popup__input-error popup__input-error_span"></span>
            </label>
            <label htmlFor="job-input" className="popup__label">
              <input type="text" id="job-input" placeholder="Занятие" name="job"
                     className="popup__input popup__input_type_job" required
                     minLength="2" maxLength="200"/>
              <span className="job-input-error popup__input-error popup__input-error_span"></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          textButton="Создать"
        >
          <fieldset className="popup__inputs">
            <label htmlFor="title-input" className="popup__label">
              <input type="text" id="title-input" name="title" placeholder="Название"
                     className="popup__input popup__input_type_title" required minLength="2" maxLength="30"/>
              <span className="title-input-error popup__input-error popup__input-error_span"></span>
            </label>
            <label htmlFor="link-input" className="popup__label">
              <input type="url" id="link-input" name="link" placeholder="Ссылка на картинку"
                     className="popup__input popup__input_type_link" required/>
              <span className="link-input-error popup__input-error popup__input-error_span"></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          textButton="Сохранить"
        >
          <fieldset className="popup__inputs">
            <label htmlFor="link-input" className="popup__label">
              <input type="url" id="link-avatar" name="avatar" placeholder="Ссылка на картинку"
                     className="popup__input popup__input_type_link" required/>
              <span className="link-avatar-error popup__input-error popup__input-error_span"></span>
            </label>
          </fieldset>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>

    </div>
  );
}

export default App;
