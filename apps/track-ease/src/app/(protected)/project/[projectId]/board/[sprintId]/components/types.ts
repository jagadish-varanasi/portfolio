export type DevStatus = "pending" | "devComplete" | "qaComplete" | "prodReady";
export type TaskStatus = "TODO" | "INPROGRESS" | "DONE";

export interface ChildTask {
  id: string;
  content: string;
  parentId: string;
  status: TaskStatus;
}

export interface ParentTask {
  id: string;
  content: string;
  status: TaskStatus;
  epic: string;
  devStatus: DevStatus;
  children: ChildTask[];
}

export interface Column {
  id: TaskStatus;
  title: string;
  childTasks: ChildTask[];
}

export interface Board {
  parentTasks: ParentTask[];
  columns: {
    [K in TaskStatus]: Column;
  };
}

export type Action =
  | {
      type: "MOVE_TASK";
      source: TaskStatus;
      destination: TaskStatus;
      taskId: string;
    }
  | { type: "ADD_CHILD_TASK"; parentId: string; content: string }
  | { type: "UPDATE_DEV_STATUS"; taskId: string; status: DevStatus }
  | { type: "ADD_COLUMN"; id: string; title: string };
