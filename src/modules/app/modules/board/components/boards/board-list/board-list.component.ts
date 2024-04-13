import { Component, OnInit, inject } from '@angular/core';
import { BoardListFacade } from '../../../lib/states/board-list/board-list.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { IBoard } from 'src/modules/api/models/boards.model';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {
  private readonly boardListFacade = inject(BoardListFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public id = this.route.snapshot.queryParamMap.get('activeBoardId');
  public boardList$ = this.boardListFacade.boardList$;
  public board$ = this.boardListFacade.board$;
  public status$ = this.boardListFacade.status$;

  handleDelete(id: IBoard['id']) {
    this.boardListFacade.deleteBoard(id);
    this.boardList$.subscribe((v) => {
      const id = v.data?.[0]?.id;
      if (id) this.handleBoardSelect(id);
    });
  }

  handleBoardSelect(id: IBoard['id']) {
    this.router.navigate(['/board'], { queryParams: { activeBoardId: id } });
    this.id = id;
  }

  ngOnInit(): void {
    this.boardListFacade.getBoardList();
  }
}
