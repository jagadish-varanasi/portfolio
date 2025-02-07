"use client";
import { loadState, saveState } from "@/lib/localStorage";
import React from "react";

export const ADD_RELEASE = "ADD_RELEASE";
export const ADD_MY_TASKS = "ADD_MY_TASKS";
export const ADD_REQUIREMENT = "ADD_REQUIREMENT";
export const ADD_EPIC = "ADD_EPIC";

interface ProjectState {
  releases: { currentId: string };
  mytasks: { currentId: string };
  requirements: { currentId: string };
  epics: { currentId: string };
}

interface State {
  projects: { [projectId: string]: ProjectState };
}

interface Action {
  type: string;
  payload: {
    projectId: string;
    id: string;
  };
}

const initialState: State = {
  projects: {
    projectId1: {
      releases: { currentId: "" },
      mytasks: { currentId: "1001" },
      requirements: { currentId: "" },
      epics: { currentId: "" },
    },
    // Add more projects as needed
  },
};

function reducer(state: State, action: Action): State {
  const { projectId, id } = action.payload;
  switch (action.type) {
    case ADD_RELEASE:
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...state.projects?.[projectId],
            releases: { currentId: id },
          },
        },
      };
    case ADD_MY_TASKS:
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...state.projects?.[projectId],
            mytasks: { currentId: id },
          },
        },
      };
    case ADD_REQUIREMENT:
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...state.projects?.[projectId],
            requirements: { currentId: id },
          },
        },
      };
    case ADD_EPIC:
      return {
        ...state,
        projects: {
          ...state.projects,
          [projectId]: {
            ...state.projects?.[projectId],
            epics: { currentId: id },
          },
        },
      };
    default:
      return state;
  }
}

const persistedState = loadState("detailsState") || initialState;

export const DetailsContext = React.createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

function DetailsContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, persistedState);

  React.useEffect(() => {
    saveState("detailsState", state);
  }, [state]);

  return (
    <DetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}

export default DetailsContextProvider;
