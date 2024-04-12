import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';
import { boardListAction } from './board-list.actions';
import { ApiService } from 'src/modules/api/api.service';
import { Store } from '@ngrx/store';

export class boardListEffects {
  loadAllBoards$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);

    return actions$.pipe(
      ofType(boardListAction.loadboards),
      mergeMap(() => {
        boardListAction.loadboards();
        return api.boards
          .findAll()
          .then((data) => {
            return boardListAction.loadboardssuccess(data.result);
          })
          .catch((err) => boardListAction.loadboardsfailed(err));
      })
    );
  });

  deleteBoard$ = createEffect(() => {
    const actions$ = inject(Actions);
    const api = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(boardListAction.deleteboard),
      switchMap((action) => {
        boardListAction.deleteboard({ id: action.id });
        return api.boards
          .delete(action.id)
          .then((data) => {
            store.dispatch(boardListAction.loadboards());
            return boardListAction.deleteboardsuccess({ id: data.result });
          })
          .catch((err) => boardListAction.deleteboardfailed(err));
      })
    );
  });
}
