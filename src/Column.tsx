import React, { FC } from "react";
import { Droppable } from "react-beautiful-dnd";

import { CardData, ColumnData } from "./store";
import classes from "./index.less";
import Group from "./Group";

interface ColumnProps {
  column: ColumnData;
  dragCard?: CardData;
}

const Column: FC<ColumnProps> = (props) => {
  const { column, dragCard } = props;
  // const groupItems = useMemo(() => {
  //   return column.groups.map((group, index) => {
  //     return <Group key={group.id} index={index} group={group} />;
  //   });
  // }, [column.groups]);

  return (
    <Droppable
      droppableId={column.id}
      direction="horizontal"
      isDropDisabled={dragCard?.colId === column.id}
    >
      {(provided) => {
        return (
          <div
            className={classes.column}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className={classes.header}>{column.title}</div>
            <div className={classes.content}>
              {column.groups.map((group, index) => {
                return (
                  <Group
                    key={group.id}
                    index={index}
                    group={group}
                    placeholder={provided.placeholder}
                  />
                );
              })}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
