import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import classes from "./index.less";
import { CardData } from "./store";

interface CardProps {
  card: CardData;
  index: number;
}

const Card: FC<CardProps> = (props) => {
  const { card, index } = props;

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classes.card}
          >
            {card.title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
