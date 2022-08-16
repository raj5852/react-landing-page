import React, { useEffect, useReducer } from "react";
import { useContext } from "react";
import { reducer } from "./Reducer";
const AppContext = React.createContext();
const API = "https://thapareactapi.up.railway.app/";

const initialState = {
  name: "",
  image: "",
  services:[]
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateHomePage = () => {
    return dispatch({
      type: "HOME_UPDATE",
      payload: {
        name: "Raj  Kumar",
        image: "./images/hero.svg",
      },
    });
  };

  const updateAboutPage = () => {
    return dispatch({
      type: "ABOUT_UPDATE",
      payload: {
        name: "Manik  Kumar",
        image: "./images/about1.svg",
      },
    });
  };

  const getServices = async (url) => {
    try {
      const rest = await fetch(url)
      const data = await rest.json()
      dispatch({type:'GET_SERVICES',payload:data})
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServices(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, updateHomePage, updateAboutPage,getServices }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
