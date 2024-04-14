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

export enum TaskStatusColorTypes {
  Progress = 'blue',
  Declined = 'darkred',
  WaitingForSupport = 'mediumpurple',
  WaitingForCustomer = 'lightblue',
  Pending = 'yellow',
  Canceled = 'gray',
  Escalated = 'orange',
  WaitingForApproval = 'lightgreen',
  AwaitingCABApproval = 'darkgreen',
  Planning = 'lightgray',
  AwaitingImplementation = 'lightyellow',
  Implementing = 'darkblue',
  PeerReviewChangeManagerApproval = 'darkgreen',
  WorkInProgress = 'darkpurple',
  Completed = 'green',
  UnderInvestigation = 'red',
}

export enum TaskPriorityColorTypes {
  Low = 'lightblue',
  Medium = 'lightgreen',
  High = 'orange',
  Urgent = 'red',
}
