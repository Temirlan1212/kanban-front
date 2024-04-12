import { createFeature, createReducer, on } from '@ngrx/store';
import { boardListAction } from './board-list.actions';
import { IBoard } from 'src/modules/api/models/boards.model';
import {
  LoadingStatus,
  PaginationResponse,
} from 'src/modules/api/models/data-access.model';

export const BOARD_LIST_FEATURE_KEY = 'boards';

export interface IBoardListInitialState {
  boardList: PaginationResponse<IBoard[]>;
  board: IBoard | null;
  status: LoadingStatus;
}

export const boardListInitialState: IBoardListInitialState = {
  boardList: {
    data: [],
    meta: {
      currentPage: 0,
      lastPage: 0,
      next: 0,
      perPage: 0,
      total: 0,
      prev: null,
    },
  },
  board: null,
  status: 'init',
};

export const boardListFeature = createFeature({
  name: BOARD_LIST_FEATURE_KEY,
  reducer: createReducer(
    boardListInitialState,
    on(boardListAction.loadboards, (state) => {
      return { ...state, status: 'loading' as const };
    }),
    on(boardListAction.loadboardsfailed, (state) => {
      return { ...state, status: 'error' as const };
    }),
    on(boardListAction.loadboardssuccess, (state, payload) => {
      return { ...state, boardList: payload, status: 'loaded' as const };
    }),
    on(boardListAction.deleteboard, (state) => {
      return { ...state, status: 'loading' as const };
    }),
    on(boardListAction.deleteboardfailed, (state) => {
      return { ...state, status: 'error' as const };
    }),
    on(boardListAction.deleteboardsuccess, (state) => {
      return { ...state };
    })
  ),
});
