import React, { useState } from "react";

const Card = ({ item, id, handleClick }) => {
  const [soundBlocked, setSoundBlocked] = useState(false);
  const itemClass = item.stat ? " active " + item.stat : "";

  const playCardClickSound = () => {
    if (!soundBlocked) {
      const audio = new Audio("./audio/Flip.mp3"); // Replace 'card_click.mp3' with the path to your audio file
      audio.play();
    }
  };

  const handleCardClick = () => {
    if (!item.stat) {
      handleClick(id);
      playCardClickSound();
    }
  };

  return (
    <div className={"card" + itemClass} onClick={handleCardClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <img src={item.img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
