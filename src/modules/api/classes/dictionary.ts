import { HttpClient } from '@angular/common/http';
import { TaskPriorityTypes, TaskStatusTypes } from '../models/dictionary.model';

export class DictionaryApi {
  constructor(private http: HttpClient) {}

  getStatuses() {
    const status = Object.keys(TaskStatusTypes).map((key, index) => ({
      id: String(index + 1),
      label: TaskStatusTypes[key as keyof typeof TaskStatusTypes],
    }));
    return status;
  }

  getPriorities() {
    const priorities = Object.keys(TaskPriorityTypes).map((key, index) => ({
      id: String(index + 1),
      label: TaskPriorityTypes[key as keyof typeof TaskPriorityTypes],
    }));
    return priorities;
  }

  getExecutors() {
    enum TaskExecutors {
      Tima = 'Tima',
      Sasha = 'Sasha',
      John = 'John',
      Emily = 'Emily',
      Alex = 'Alex',
      Maria = 'Maria',
      David = 'David',
      Emma = 'Emma',
      Michael = 'Michael',
      Olivia = 'Olivia',
    }

    const executors = Object.keys(TaskExecutors).map((key, index) => ({
      id: String(index + 1),
      label: TaskExecutors[key as keyof typeof TaskExecutors],
    }));
    return executors;
  }

  getStatusField(id: string, field: 'label' | 'id') {
    return (
      this.getStatuses().filter((item) => String(item.id) == id)?.[0]?.[
        field
      ] || ''
    );
  }

  getPriorityField(id: string, field: 'label' | 'id') {
    return (
      this.getPriorities().filter((item) => String(item.id) == id)?.[0]?.[
        field
      ] || ''
    );
  }

  getExecutorField(
    id: string,
    field: 'label' | 'id',
    firstLetter: boolean = true
  ) {
    const executor =
      this.getExecutors().filter((item) => String(item.id) == id)?.[0]?.[
        field
      ] || '';

    return firstLetter ? String(executor).slice(0, 1) : executor;
  }
}
