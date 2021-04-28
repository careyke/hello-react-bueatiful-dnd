import React, { FC, useReducer, useState } from "react";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";

import classes from "./index.less";
import Column from "./Column";
import { reducer, DispatchContext, generateData, CardData } from "./store";

const { state: initStore, cardDataMap } = generateData(3, 5);

const Container: FC = () => {
  const [state, dispatch] = useReducer(reducer, initStore);
  const [dragCard, setDragCard] = useState<CardData>();

  const handleDragEnd: DragDropContextProps["onDragEnd"] = (
    result,
    provided
  ) => {
    console.log(result, provided);
    // const { destination, source } = result;
    // if (!destination) return;
    // if (source.droppableId === destination.droppableId) {
    //   // 同列
    //   if (source.index === destination.index) return;
    //   dispatch({
    //     type: "moveInSameCol",
    //     payload: {
    //       dragIndex: source.index,
    //       dropIndex: destination.index,
    //       colId: source.droppableId,
    //     },
    //   });
    // } else {
    //   dispatch({
    //     type: "moveDiffCol",
    //     payload: {
    //       dragIndex: source.index,
    //       dropIndex: destination.index,
    //       dragColId: source.droppableId,
    //       dropColId: destination.droppableId,
    //     },
    //   });
    // }
  };
  const onBeforeCapture: DragDropContextProps["onBeforeCapture"] = (before) => {
    console.log("onBeforeCapture");
    console.log(before);
    setDragCard(cardDataMap.get(before.draggableId));
  };
  const onBeforeDragStart: DragDropContextProps["onBeforeDragStart"] = (
    initial
  ) => {
    console.log("onBeforeDragStart");
    console.log(initial);
  };
  const onDragStart: DragDropContextProps["onDragStart"] = (initial) => {
    console.log("onDragStart");
    console.log(initial);
  };
  const onDragUpdate: DragDropContextProps["onDragUpdate"] = (initial) => {
    console.log("onDragUpdate");
    console.log(initial);
  };

  const renderColumn = () => {
    return Object.values(state).map((column) => {
      return <Column key={column.id} column={column} dragCard={dragCard} />;
    });
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <DispatchContext.Provider value={dispatch}>
        <div className={classes.container}>{renderColumn()}</div>
      </DispatchContext.Provider>
    </DragDropContext>
  );
};

export default Container;
