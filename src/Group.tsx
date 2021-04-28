import React, { FC, ReactNode, useMemo } from "react";
import { Droppable } from "react-beautiful-dnd";

import { GroupData } from "./store";
import Card from "./Card";
import classes from "./index.less";

interface GroupProps {
  group: GroupData;
  index: number;
  placeholder?: ReactNode;
}

const Group: FC<GroupProps> = (props) => {
  const { group, placeholder } = props;
  const cardItems = useMemo(() => {
    return group.cards.map((card, index) => {
      return <Card key={card.id} index={index} card={card} />;
    });
  }, [group.cards]);

  return (
    <Droppable droppableId={group.id}>
      {(provided) => {
        return (
          <div
            className={classes.group}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className={classes.title}>{group.title}</div>
            <div className={classes.content}>
              {placeholder}
              {cardItems}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Group;
