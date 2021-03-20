import React, { FC, useReducer } from "react";
import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";

import classes from "./index.less";
import Column from "./Column";
import { reducer, DispatchContext, initStore } from "./store";

const Container: FC = () => {
  const [state, dispatch] = useReducer(reducer, initStore);

  const handleDragEnd: DragDropContextProps["onDragEnd"] = (result) => {
    console.log(result);
    const { destination, source } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      // 同列
      if (source.index === destination.index) return;
      dispatch({
        type: "moveInSameCol",
        payload: {
          dragIndex: source.index,
          dropIndex: destination.index,
          colId: source.droppableId,
        },
      });
    } else {
      dispatch({
        type: "moveDiffCol",
        payload: {
          dragIndex: source.index,
          dropIndex: destination.index,
          dragColId: source.droppableId,
          dropColId: destination.droppableId,
        },
      });
    }
  };

  const renderColumn = () => {
    return Object.values(state).map((column) => {
      return <Column key={column.id} column={column} />;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DispatchContext.Provider value={dispatch}>
        <div className={classes.container}>{renderColumn()}</div>
      </DispatchContext.Provider>
    </DragDropContext>
  );
};

export default Container;
