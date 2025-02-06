"use client";
import React from "react";

export const ADD_RELEASE = "ADD_RELEASE";
export const ADD_SPRINT = "ADD_SPRINT";
export const ADD_REQUIREMENT = "ADD_REQUIREMENT";
export const ADD_EPIC = "ADD_EPIC";

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
