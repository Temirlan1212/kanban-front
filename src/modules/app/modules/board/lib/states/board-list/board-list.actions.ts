import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { IBoard } from 'src/modules/api/models/boards.model';
import { PaginationResponse } from 'src/modules/api/models/data-access.model';

export const boardListAction = createActionGroup({
  source: 'board_list',
  events: {
    loadBoards: emptyProps(),
    loadBoardsSuccess: props<PaginationResponse<IBoard[]>>(),
    loadBoardsFailed: props<{ error: Error }>(),

    deleteBoard: props<Pick<IBoard, 'id'>>(),
    deleteBoardSuccess: props<Pick<IBoard, 'id'>>(),
    deleteBoardFailed: props<{ error: Error }>(),
  },
});
