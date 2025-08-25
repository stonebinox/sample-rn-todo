import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
  id: string;
  title: string;
  label?: string;
  dueDate?: Date;
  isCompleted: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "isCompleted">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within a TaskProvider");
  return ctx;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("TASKS");

        if (stored) setTasks(JSON.parse(stored));
      } catch (e) {
        // handle error
        console.error("Failed to load tasks", e);
      }
    })();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  const getStoredTasks = async (): Promise<Task[]> => {
    try {
      const stored = await AsyncStorage.getItem("TASKS");

      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  const persistTasks = async (newTasks: Task[]) => {
    await AsyncStorage.setItem("TASKS", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const addTask = async (task: Omit<Task, "id" | "isCompleted">) => {
    const prev = await getStoredTasks();
    const newTasks = [
      ...prev,
      { ...task, id: Math.random().toString(36).slice(2), isCompleted: false },
    ];
    await persistTasks(newTasks);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const prev = await getStoredTasks();
    const newTasks = prev.map((task: Task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    await persistTasks(newTasks);
  };

  const removeTask = async (id: string) => {
    const prev = await getStoredTasks();
    const newTasks = prev.filter((task: Task) => task.id !== id);
    await persistTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
