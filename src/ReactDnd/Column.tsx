import React, { FC } from "react";
import { useDrop } from "react-dnd";

import { CardData, ColumnData } from "../store";
import classes from "../index.less";
import Group from "./Group";

interface ColumnProps {
  column: ColumnData;
  dragCard?: CardData;
}

const Column: FC<ColumnProps> = (props) => {
  const { column } = props;
  const [, dropRef] = useDrop(
    {
      accept: "card",
      hover: (dragItem: CardData) => {
        if (dragItem.colId === column.id) return;
        console.log(column.id, dragItem);
      },
    },
    []
  );

  return (
    <div className={classes.column}>
      <div className={classes.header}>{column.title}</div>
      <div className={classes.content} ref={dropRef}>
        {column.groups.map((group, index) => {
          return (
            <Group
              key={group.id}
              group={group}
              index={index}
              colId={column.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
