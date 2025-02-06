"use client";
import React from "react";

const ADD_RELEASE = "ADD_RELEASE";
const ADD_SPRINT = "ADD_SPRINT";
const ADD_REQUIREMENT = "ADD_REQUIREMENT";
const ADD_EPIC = "ADD_EPIC";

function reducer(state: any, action: any) {
  switch (action.type) {
    case ADD_RELEASE:
      return {
        ...state,
        releases: {
          currentId: action.payload.id,
          data: {
            ...state.releases.data,
            [action.payload.id]: action.payload.data,
          },
        },
      };
    case ADD_SPRINT:
      return {
        ...state,
        sprints: {
          currentId: action.payload.id,
          data: {
            ...state.sprints.data,
            [action.payload.id]: action.payload.data,
          },
        },
      };
    case ADD_REQUIREMENT:
      console.log(action, "AAAAAAAAAAAAA");
      return {
        ...state,
        requirements: {
          currentId: action.payload.id,
          data: {
            ...state.requirements.data,
            [action.payload.id]: action.payload.data,
          },
        },
      };
    case ADD_EPIC:
      return {
        ...state,
        epics: {
          currentId: action.payload.id,
          data: {
            ...state.epics.data,
            [action.payload.id]: action.payload.data,
          },
        },
      };
    default:
      return state;
  }
}

const initialState = {
  releases: { currentId: "", data: {} },
  sprints: { currentId: "", data: {} },
  requirements: { currentId: "", data: {} },
  epics: { currentId: "", data: {} },
};

const addRelease = (id: string, data: string) => ({
  type: ADD_RELEASE,
  payload: { id, data },
});
const addSprint = (id: string, data: string) => ({
  type: ADD_SPRINT,
  payload: { id, data },
});
const addRequirement = (id: string, data: string) => ({
  type: ADD_REQUIREMENT,
  payload: { id, data },
});
const addEpic = (id: string, data: string) => ({
  type: ADD_EPIC,
  payload: { id, data },
});

export const addDetails = (type: string, id: string, data: string) => ({
  type: type,
  payload: { id, data },
});

export const DetailsContext = React.createContext<
  | {
      state: any;
      dispatch: any;
    }
  | undefined
>(undefined);

function DetailsContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}

export default DetailsContextProvider;
