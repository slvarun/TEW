import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const addmonContext = createContext(INITIAL_STATE);

const addmonReducer = (state, action) => {
  switch (action.type) {
    case "ADDMON_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "ADDMON_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "ADDMON_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const addmonContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addmonReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user]);

  return (
    <addmonContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </addmonContext.Provider>
  );
};
