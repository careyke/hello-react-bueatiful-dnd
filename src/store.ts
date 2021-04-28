import { createContext, Dispatch, useContext, Reducer } from "react";
import { produce } from "immer";

export interface CardData {
  id: string;
  title: string;
  groupId: string;
  colId: string;
}

export interface GroupData {
  id: string;
  title: string;
  cards: CardData[];
}

export interface ColumnData {
  id: string;
  title: string;
  groups: GroupData[];
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

/**
 * TODO: card要做成数据池
 * @param state
 * @param action
 * @returns
 */

export const reducer: Reducer<State, Action> = (state, action) =>
  produce(state, (draftState) => {
    const { type, payload } = action;
    switch (type) {
      case "moveInSameGroup": {
        const { dragId, dropId, colId, groupIndex } = payload;
        const group = draftState[colId].groups[groupIndex];
        const dragIndex = group.cards.findIndex((item) => item.id === dragId);
        const dropIndex = group.cards.findIndex((item) => item.id === dropId);
        const card = group.cards[dragIndex];
        group.cards.splice(dragIndex, 1);
        group.cards.splice(dropIndex, 0, card);
        return draftState;
      }
      case "moveInDiffGroup": {
        const { dragId, dropId, colId, dragGroupId, dropGroupId } = payload;
        const dragGroup = draftState[colId].groups.find(
          (item) => item.id === dragGroupId
        ) as GroupData;
        const dropGroup = draftState[colId].groups.find(
          (item) => item.id === dropGroupId
        ) as GroupData;
        const dragIndex = dragGroup.cards.findIndex(
          (item) => item.id === dragId
        );
        const dropIndex = dropGroup.cards.findIndex(
          (item) => item.id === dropId
        );
        const card = dragGroup.cards[dragIndex];
        dragGroup.cards.splice(dragIndex, 1);
        dropGroup.cards.splice(dropIndex, 0, card);
        return draftState;
      }
      default:
        return state;
    }
  });

export const generateData = (colNumber: number, cardNumber: number) => {
  const state: State = {};
  const cardDataMap = new Map<string, CardData>();
  for (let i = 0; i < colNumber; i++) {
    const col: ColumnData = {
      id: `col_id_${i}`,
      title: `Column ${i}`,
      groups: [],
    };
    for (let n = 0; n < 3; n++) {
      const group: GroupData = {
        id: `group_id_${i}_${n}`,
        title: `Group ${i}${n}`,
        cards: [],
      };
      for (let j = 0; j < cardNumber; j++) {
        const card = {
          id: `card_id_${i}_${n}_${j}`,
          title: `Card ${i}${n}${j}`,
          groupId: group.id,
          colId: col.id,
        };
        group.cards.push(card);
        cardDataMap.set(card.id, card);
      }
      col.groups.push(group);
    }

    state[col.id] = col;
  }
  return { state, cardDataMap };
};
