import React, { useState, useEffect } from "react";
import Card from "./Card";

function Cards() {
  const [items, setItems] = useState(
    [
      { id: 1, img: "./img/image1.png", stat: "" },
      { id: 1, img: "./img/image1.png", stat: "" },
      { id: 2, img: "./img/image2.png", stat: "" },
      { id: 2, img: "./img/image2.png", stat: "" },
      { id: 3, img: "./img/image3.png", stat: "" },
      { id: 3, img: "./img/image3.png", stat: "" },
      { id: 4, img: "./img/image4.png", stat: "" },
      { id: 4, img: "./img/image4.png", stat: "" },
      { id: 5, img: "./img/image5.png", stat: "" },
      { id: 5, img: "./img/image5.png", stat: "" },
      { id: 6, img: "./img/image6.png", stat: "" },
      { id: 6, img: "./img/image6.png", stat: "" },
      { id: 7, img: "./img/image7.png", stat: "" },
      { id: 7, img: "./img/image7.png", stat: "" },
      { id: 8, img: "./img/image8.png", stat: "" },
      { id: 8, img: "./img/image8.png", stat: "" },
    ].sort(() => Math.random() - 0.5)
  );

  const [prev, setPrev] = useState(-1);
  const [matchedCount, setMatchedCount] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    if (matchedCount === items.length / 2) {
      // All cards are matched
      setTimeout(() => {
        // Trigger fade-out animation for cards
        setShowFade(true);
      }, 500); // Fade out after 2 seconds

      // After fade-out animation, fade in video file along with audio
      setTimeout(() => {
        // Code to fade in video file along with audio
        setShowVideo(true);
      }, 1000); // 1 second delay for fade-out animation and 2 seconds for fade-in video file
    }
  }, [matchedCount, items.length]);

  function check(current) {
    if (items[current].id === items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
      playCorrectSound();
      setMatchedCount(matchedCount + 1); // Increment matched count
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }

  function playCorrectSound() {
    var audio = document.getElementById("correct-sound");
    audio.play();
  }

  function handleClick(id) {
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  }

  return (
    <>
      <div className={`title_text ${showFade ? "fade-out" : ""}`}>
        Match the pairs below to open the screens
      </div>
      <div className={`container ${showFade ? "fade-out" : ""}`}>
        {items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={handleClick} />
        ))}
      </div>
      <div className={`video-container ${showVideo ? "fade-in" : ""}`}>
        {/* Video file along with audio */}
        {showVideo && (
          <>
            <video autoPlay loop>
              <source src="./video/success_anim.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <audio autoPlay loop>
              <source src="./audio/crow_clapping.mp3" type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </>
        )}
      </div>
    </>
  );
}

export default Cards;
