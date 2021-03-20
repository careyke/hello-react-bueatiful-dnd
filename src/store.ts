import { createContext, Dispatch, useContext, Reducer } from "react";
import { produce } from "immer";

export interface CardData {
  id: string;
  title: string;
}

export interface ColumnData {
  id: string;
  title: string;
  cards: CardData[];
}

export interface State {
  [prop: string]: ColumnData;
}

interface Action {
  type: string;
  payload: CommonObject;
}

export const DispatchContext = createContext<Dispatch<Action>>(() => undefined);

export const useDispatchContext = () => {
  return useContext(DispatchContext);
};

export const reducer: Reducer<State, Action> = (state, action) =>
  produce(state, (draftState) => {
    const { type, payload } = action;
    switch (type) {
      case "moveInSameCol": {
        const { dragIndex, dropIndex, colId } = payload;
        const column = draftState[colId];
        const dragCard = column.cards.splice(dragIndex, 1)[0];
        column.cards.splice(dropIndex, 0, dragCard);
        return draftState;
      }
      case "moveDiffCol": {
        const { dragIndex, dropIndex, dragColId, dropColId } = payload;
        const dragColumn = draftState[dragColId];
        const dropColumn = draftState[dropColId];
        const dragCard = dragColumn.cards.splice(dragIndex, 1)[0];
        dropColumn.cards.splice(dropIndex, 0, dragCard);
        return draftState;
      }
      default:
        return state;
    }
  });

const generateData = (colNumber: number, cardNumber: number) => {
  const state: State = {};
  for (let i = 0; i < colNumber; i++) {
    const col: ColumnData = {
      id: `col_id_${i}`,
      title: `Column ${i}`,
      cards: [],
    };
    for (let j = 0; j < cardNumber; j++) {
      col.cards.push({ id: `card_id_${i}_${j}`, title: `Card ${i}${j}` });
    }
    state[col.id] = col;
  }
  return state;
};

export const initStore = generateData(3, 5);
