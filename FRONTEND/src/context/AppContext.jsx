import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const [addTaskDiv, setAddTaskDiv] = useState("hidden");
  const [editTaskDiv, setEditTaskDiv] = useState("hidden");
  const [editTaskId, setEditTaskId] = useState("");
  const [tasks, setTasks] = useState();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    setUser,
    addTaskDiv,
    setAddTaskDiv,
    editTaskDiv,
    setEditTaskDiv,
    editTaskId,
    setEditTaskId,
    tasks,
    setTasks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
