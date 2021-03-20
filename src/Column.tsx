import React, { FC, useMemo } from "react";
import { Droppable } from "react-beautiful-dnd";

import { ColumnData } from "./store";
import classes from "./index.less";
import Card from "./Card";

interface ColumnProps {
  column: ColumnData;
}

const Column: FC<ColumnProps> = (props) => {
  const { column } = props;
  const cardItems = useMemo(() => {
    return column.cards.map((card, index) => {
      return <Card key={card.id} index={index} card={card} />;
    });
  }, [column.cards]);

  return (
    <Droppable droppableId={column.id}>
      {(provided) => {
        return (
          <div
            className={classes.column}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className={classes.header}>{column.title}</div>
            <div className={classes.content}>
              {cardItems}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
