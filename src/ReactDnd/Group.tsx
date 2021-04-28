import React, { FC, useMemo } from "react";

import { GroupData } from "../store";
import Card from "./Card";
import classes from "../index.less";

interface GroupProps {
  group: GroupData;
  colId: string;
  index: number;
}

const Group: FC<GroupProps> = (props) => {
  const { group, index: groupIndex, colId } = props;

  const cardItems = useMemo(() => {
    return group.cards.map((card, index) => {
      return (
        <Card
          key={card.id}
          card={card}
          index={index}
          groupIndex={groupIndex}
          colId={colId}
          groupId={group.id}
        />
      );
    });
  }, [group, groupIndex, colId]);

  return (
    <div className={classes.group}>
      <div className={classes.title}>{group.title}</div>
      <div className={classes.content}>{cardItems}</div>
    </div>
  );
};

export default Group;
