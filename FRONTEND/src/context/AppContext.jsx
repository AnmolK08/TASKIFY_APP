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
  try {
    const parsedUser = storedUser ? JSON.parse(storedUser) : "";
    setUser(parsedUser);
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    setUser("");
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
