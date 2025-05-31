import axios from "axios";
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
    const fetchUser = async () => {
      
      try {
        const {data} = await axios.get("http://localhost:1800/api/v1/user/isAuthenticated" , { withCredentials : true});
        setUser(data.user);
      } catch (error) {
        console.log(error.message);
        setUser();
      }
    };

    fetchUser();
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
