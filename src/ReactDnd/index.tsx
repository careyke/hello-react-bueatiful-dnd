import React, { useReducer } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import classes from "../index.less";
import Column from "./Column";
import { reducer, DispatchContext, generateData } from "../store";

const { state: initStore } = generateData(3, 5);

const ReactDnd = () => {
  const [state, dispatch] = useReducer(reducer, initStore);

  const renderColumn = () => {
    return Object.values(state).map((column) => {
      return <Column key={column.id} column={column} />;
    });
  };
  return (
    <DispatchContext.Provider value={dispatch}>
      <DndProvider backend={HTML5Backend}>
        <div className={classes.container}>{renderColumn()}</div>
      </DndProvider>
    </DispatchContext.Provider>
  );
};

export default ReactDnd;
