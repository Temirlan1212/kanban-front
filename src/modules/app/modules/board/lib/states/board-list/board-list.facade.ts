import { inject, Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { boardListAction } from './board-list.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  BOARD_LIST_FEATURE_KEY,
  IBoardListInitialState,
} from './board-list.reducer';
import { IBoard } from 'src/modules/api/models/boards.model';

export const boardListState = createFeatureSelector<IBoardListInitialState>(
  BOARD_LIST_FEATURE_KEY
);

export const selectBoardList = createSelector(
  boardListState,
  (state: IBoardListInitialState) => state.boardList
);

export const selectStatus = createSelector(
  boardListState,
  (state: IBoardListInitialState) => state.status
);

export const selectBoard = createSelector(
  boardListState,
  (state: IBoardListInitialState) => state.board
);

@Injectable({
  providedIn: 'root',
})
export class BoardListFacade {
  private readonly store = inject(Store);
  status$ = this.store.pipe(select(selectStatus));
  boardList$ = this.store.pipe(select(selectBoardList));
  board$ = this.store.pipe(select(selectBoard));

  getBoardList() {
    this.store.dispatch(boardListAction.loadboards());
  }

  deleteBoard(id: IBoard['id']) {
    this.store.dispatch(boardListAction.deleteboard({ id }));
  }
}
