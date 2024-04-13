export interface IBoard {
  title: string;
  id: string;
}

export interface IBoardColumns {
  id: string;
  boardId: string;
  columns: IBoardColumn[];
}

export interface IBoardColumn {
  title: string;
  id: string;
  tasksIds: string[];
}
