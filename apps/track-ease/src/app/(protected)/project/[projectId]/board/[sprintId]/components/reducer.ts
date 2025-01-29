import { type Board, type Action, type TaskStatus, DevStatus } from "./types";

// Helper function to initialize the board
function initializeBoard(board: Board): Board {
  const initializedBoard = structuredClone(board);

  // Clear existing child tasks from columns
  Object.values(initializedBoard.columns).forEach((column) => {
    column.childTasks = [];
  });

  // Distribute child tasks to appropriate columns
  initializedBoard.parentTasks.forEach((parent) => {
    parent.children.forEach((child) => {
      initializedBoard.columns[child.status].childTasks.push(child);
    });
  });

  return initializedBoard;
}

export function boardReducer(state: Board, action: Action): Board {
  switch (action.type) {
    case "MOVE_TASK": {
      const { source, destination, taskId } = action;
      const updatedBoard = structuredClone(state);

      // Find and remove task from source column
      const sourceColumnTasks = updatedBoard.columns[source].childTasks;
      const taskIndex = sourceColumnTasks.findIndex(
        (task) => task.id === taskId
      );
      const [movedTask] = sourceColumnTasks.splice(taskIndex, 1);

      // Add task to destination column
      movedTask.status = destination;
      updatedBoard.columns[destination].childTasks.push(movedTask);

      // Update parent task status
      const parentTask = updatedBoard.parentTasks.find((p) =>
        p.children.some((c) => c.id === taskId)
      );

      if (parentTask) {
        // Update the child task status in parent's children array
        const childTask = parentTask.children.find((c) => c.id === taskId);
        if (childTask) {
          childTask.status = destination;

          // Update parent task status based on children
          if (areAllChildTasksDone(parentTask)) {
            parentTask.status = "DONE";
          } else if (
            parentTask.children.some((child) => child.status === "INPROGRESS")
          ) {
            parentTask.status = "INPROGRESS";
            if (parentTask.devStatus !== "pending") {
              parentTask.devStatus = "pending";
            }
          } else {
            parentTask.status = "TODO";
            if (parentTask.devStatus !== "pending") {
              parentTask.devStatus = "pending";
            }
          }
        }
      }

      return updatedBoard;
    }

    case "ADD_CHILD_TASK": {
      const updatedBoard = structuredClone(state);
      const parentTask = updatedBoard.parentTasks.find(
        (task) => task.id === action.parentId
      );

      if (parentTask) {
        const newChild = {
          id: `child-${Date.now()}`,
          content: action.content,
          parentId: action.parentId,
          status: "todo" as TaskStatus,
        };

        parentTask.children.push(newChild);
        updatedBoard.columns.TODO.childTasks.push(newChild);
      }

      return updatedBoard;
    }

    case "UPDATE_DEV_STATUS": {
      const updatedBoard = structuredClone(state);
      const parentTask = updatedBoard.parentTasks.find(
        (task) => task.id === action.taskId
      );

      if (parentTask && areAllChildTasksDone(parentTask)) {
        parentTask.devStatus = action.status;
      }

      return updatedBoard;
    }
    case "ADD_COLUMN": {
      const updatedBoard = structuredClone(state);
      const newColumnId = action.id.toLowerCase().replace(/\s+/g, "-");

      // Add new column type to TaskStatus
      updatedBoard.columns[newColumnId as TaskStatus] = {
        id: newColumnId as TaskStatus,
        title: action.title,
        childTasks: [],
      };

      return updatedBoard;
    }

    default:
      return state;
  }
}

function areAllChildTasksDone(task: {
  children: { status: string }[];
}): boolean {
  return task.children.every((child) => child.status === "DONE");
}
