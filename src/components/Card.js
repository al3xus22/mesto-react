import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <>
      <li className="element">
        <button className="element__trash" type="button"></button>
        <img src={props.link} alt={props.name} className="element__image" onClick={handleClick}/>
        <div className="element__content">
          <h2 className="element__name">{props.name}</h2>
          <div className="element__like-container">
            <button className="element__button-like" type="button"></button>
            <p className="element__likes">{props.likes.length}</p>
          </div>
        </div>
      </li>
    </>
  )
}

export default Card;