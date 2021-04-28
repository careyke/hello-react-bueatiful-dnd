import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import classnames from "classnames";

import classes from "../index.less";
import { CardData, useDispatchContext } from "../store";

interface CardProps {
  card: CardData;
  index: number;
  groupIndex: number;
  colId: string;
  groupId: string;
}

const Card: FC<CardProps> = (props) => {
  const { card, index, groupIndex, colId, groupId } = props;
  const dispatch = useDispatchContext();
  const [dragCollection, dragRef] = useDrag(
    {
      type: "card",
      item: { ...card, index, groupId, colId },
      collect: (monitor) => {
        return { isDragging: monitor.isDragging() };
      },
    },
    []
  );
  const [, dropRef] = useDrop(
    {
      accept: "card",
      hover: (dragItem: CommonObject) => {
        if (dragItem.id === card.id) return;
        if (dragItem.colId !== card.colId) return;
        console.log(dragItem.id, card.id);
        if (dragItem.groupId !== card.groupId) {
          dispatch({
            type: "moveInDiffGroup",
            payload: {
              dragId: dragItem.id,
              dropId: card.id,
              colId: colId,
              dragGroupId: dragItem.groupId,
              dropGroupId: groupId,
            },
          });
        } else {
          dispatch({
            type: "moveInSameGroup",
            payload: {
              dragId: dragItem.id,
              dropId: card.id,
              colId: dragItem.colId,
              groupIndex: groupIndex,
            },
          });
        }
      },
    },
    []
  );

  const cardClass = classnames({
    [classes.card]: true,
    [classes.draggingCard]: dragCollection.isDragging,
  });

  return (
    <div
      ref={(e) => {
        dropRef(dragRef(e));
      }}
      className={cardClass}
    >
      {card.title}
    </div>
  );
};

export default Card;
