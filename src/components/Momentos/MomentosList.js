import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "../../utils/CustomHooks";

import edit from "../../graphics/icons/edit.png";
import MomentosCard from "./MomentosCard";

const MomentosList = ({}) => {
  const cards = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      description: "Cool photo right?",
      likes: 7,
      fires: 3,
      claps: 2,
      laughs: 1,
    },
    {
      image:
        "https://st4.depositphotos.com/1003315/20469/i/600/depositphotos_204692466-stock-photo-patan-ancient-city-kathmandu-valley.jpg",
      description: "Cooler photo righter?",
      likes: 19,
      fires: 6,
      claps: 9,
      laughs: 5,
    },
    {
      image:
        "https://i.kym-cdn.com/entries/icons/original/000/027/131/Screen_Shot_2018-09-11_at_3.39.05_PM.jpg",
      description: "Ok so I'm monky!",
      likes: 69,
      fires: 420,
      claps: 1738,
      laughs: 12345,
    },
    {
      image:
        "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F1109%2Fsoc_fans%2Dguide%2Dwc_16x9.jpg",
      description: "The world's sport.",
      likes: 1,
      fires: 0,
      claps: 1,
      laughs: 0,
    },
  ];
  return (
    <div
      style={{
        height: "fit-content",
        margin: "auto",
      }}
    >
      {cards.map((card, index) => (
        <div>
          <MomentosCard data={card} />
        </div>
      ))}
    </div>
  );
};

export default MomentosList;
