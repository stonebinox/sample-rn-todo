import { TasksContainer } from "./index.styles";
import { Task, useTasks } from "../../contexts/task-provider";
import { TaskCard } from "../task-card";

export const TasksView = () => {
  const { tasks } = useTasks();

  return (
    <TasksContainer
      contentContainerStyle={{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        gap: 14,
      }}
    >
      {tasks.map((task: Task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </TasksContainer>
  );
};
