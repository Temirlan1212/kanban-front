export interface IDictionary<T> {
  label: T;
  id: string | number;
}

export enum TaskStatusTypes {
  Progress = 'Progress',
  Declined = 'Declined',
  WaitingForSupport = 'Waiting for support',
  WaitingForCustomer = 'Waiting for customer',
  Pending = 'Pending',
  Canceled = 'Canceled',
  Escalated = 'Escalated',
  WaitingForApproval = 'Waiting for approval',
  AwaitingCABApproval = 'Awaiting CAB approval',
  Planning = 'Planning',
  AwaitingImplementation = 'Awaiting implementation',
  Implementing = 'Implementing',
  PeerReviewChangeManagerApproval = 'Peer review / change manager approval',
  WorkInProgress = 'Work in progress',
  Completed = 'Completed',
  UnderInvestigation = 'Under investigation',
}

export enum TaskPriorityTypes {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}
