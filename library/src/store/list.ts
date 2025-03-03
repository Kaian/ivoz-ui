import { Action, action, Thunk, thunk } from 'easy-peasy';
import { EntityValues } from '../services/entity/EntityService';

export interface ListState {
  parentRow: EntityValues | undefined;
  rows: Array<EntityValues>;
  headers: Record<string, string>;
}

interface ListActions {
  setParentRow: Action<ListState, undefined | EntityValues>;
  setRows: Action<ListState, Array<EntityValues>>;
  setHeaders: Action<ListState, Record<string, string>>;
  reset: Thunk<ListState, undefined, unknown>;
}

export type ListStore = ListState & ListActions;

const list: ListStore = {
  parentRow: undefined,
  rows: [],
  headers: {},

  // actions
  setParentRow: action<ListState, undefined | EntityValues>((state, row) => {
    state.parentRow = row;
  }),

  setRows: action<ListState, Array<EntityValues>>((state, rows) => {
    state.rows = [...rows];
  }),

  setHeaders: action<ListState, Record<string, string>>((state, headers) => {
    state.headers = { ...headers };
  }),

  // thunks
  reset: thunk<ListActions, undefined, unknown>(async (actions) => {
    actions.setRows([]);
    actions.setHeaders({});
  }),
};

export default list;
