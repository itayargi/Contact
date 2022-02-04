import React, { useState } from "react";
import AppContext from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// AsyncStorage.clear()
const initUser = {
  finishOnboarding: false,
};



export const AppProvider = (props) => {
 

  const [user, setUser] = useState(initUser);


  const updateUserStateOnStart = (val) => {
    let newUser = { ...user, ...val };
    setUser(newUser);
  };

  const updateUserDetails = (val) => {
    let newUser = { ...user, ...val };
    try {
       AsyncStorage.setItem("USER", JSON.stringify(newUser));
    } catch (e) {
      // saving error
    }
    
    setUser(newUser);
  };

  return (
    <AppContext.Provider
      value={{
        user: user,
        updateUserStateOnStart,
        updateUserDetails,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
