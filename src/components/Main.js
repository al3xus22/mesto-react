import React from "react";
import {api} from "../utils/Api.js";
import Card from "./Card.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        const cards = data.map((card) => {
          return {
            link: card.link,
            name: card.name,
            likes: card.likes,
            id: card._id
          }
        })
        setCards(cards);
      })
      .catch
      ((error) => {
        console.log(error)
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <img src={userAvatar} alt="Аватар" className="profile__avatar"/>
        <button className="profile__avatar-edit" type="button" onClick={onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements-list">
        <ul className="elements">
        </ul>
      </section>
      <section className="elements-list">
        <ul className="elements">
          {cards.map((item) => (
            <Card
              onCardClick={onCardClick}
              card={item}
              key={item.id}
              link={item.link}
              title={item.name}
              likes={item.likes}
            />
          ))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;