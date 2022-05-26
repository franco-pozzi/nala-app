import React, { createContext } from "react";
import { app } from "./lib/firebase";

const Context = createContext(null);

const Provider = function ({ children }) {
  return (
	<Context.Provider value={ { firebase: app } }>
	{children}
    </Context.Provider>
  );
};

export { Context, Provider };
