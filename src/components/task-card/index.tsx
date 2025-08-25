import { Image, Animated, TouchableOpacity } from "react-native";
import { useEffect, useMemo, useState, useRef } from "react";

import { Task, useTasks } from "../../contexts/task-provider";
import {
  CheckBoxContainer,
  CheckIconContainer,
  DataRow,
  DataRowText,
  OverdueText,
  RedDot,
  SecondaryButton,
  TaskContainer,
  TaskContentContainer,
  TaskTitle,
} from "./index.styles";
import CheckIcon from "../../../assets/check.png";
import FolderIcon from "../../../assets/folder.png";
import CalendarIcon from "../../../assets/calendar.png";
import WhiteCheckboxIcon from "../../../assets/white-checkbox.png";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { dueDate } = task;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { updateTask } = useTasks();
  const [showUndo, setShowUndo] = useState<boolean>(false);
  const [undoTimer, setUndoTimer] = useState<number>(7);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  const checkTask = () => {
    if (!isChecked) {
      setIsChecked(true);
      setShowUndo(true);
      setUndoTimer(7);

      setInterval(() => {
        setUndoTimer((t) => t - 1);
      }, 1000);

      animationRef.current = setTimeout(() => {
        setShowUndo(false);
        updateTask(task.id, { isCompleted: true });
        // Animate fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setIsVisible(false);
        });
      }, 7000);
    } else {
      setIsChecked(false);
      updateTask(task.id, { isCompleted: false });
    }
  };

  const handleUndo = () => {
    setIsChecked(false);
    setShowUndo(false);
    setUndoTimer(7);

    // Clear any existing timers
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    // Reset fade if user undoes
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsVisible(true);
  };

  const dueDateLabel = useMemo(() => {
    if (!dueDate) return "-";

    const date = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compare = new Date(date);
    compare.setHours(0, 0, 0, 0);
    const diff = (compare.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";

    return compare.toLocaleDateString();
  }, [dueDate]);

  // Clean up timer if component unmounts or undo is pressed
  useEffect(() => {
    if (!showUndo) {
      setUndoTimer(7);
    }
  }, [showUndo]);

  useEffect(() => {
    if (showUndo && undoTimer <= 0) {
      setShowUndo(false);
      setUndoTimer(7);
      // Animate fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
  }, [undoTimer, showUndo, fadeAnim]);

  useEffect(() => {
    setIsChecked(task.isCompleted);

    if (task.isCompleted) {
      // If task is already completed, hide it
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
  }, [task]);

  if (!isVisible) return null;

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TaskContainer>
        <CheckIconContainer>
          <Image source={CheckIcon} />
        </CheckIconContainer>
        <TaskContentContainer>
          <TaskTitle>{task.title}</TaskTitle>
          <DataRow>
            <Image source={FolderIcon} />
            <DataRowText>{task.label || "-"}</DataRowText>
          </DataRow>
          <DataRow>
            <Image source={CalendarIcon} />
            <DataRowText>{dueDateLabel} </DataRowText>
            {/* Only show Overdue if due date is in the past */}
            {(() => {
              if (!dueDate) return false;
              const date =
                typeof dueDate === "string" ? new Date(dueDate) : dueDate;
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const compare = new Date(date);
              compare.setHours(0, 0, 0, 0);
              const diff =
                (compare.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
              return diff < 0;
            })() && (
              <>
                <RedDot />
                <OverdueText>Overdue</OverdueText>
              </>
            )}
          </DataRow>
          {showUndo && (
            <DataRow style={{ marginTop: 8, alignItems: "center" }}>
              <DataRowText style={{ color: "#0F4A4A", fontWeight: "bold" }}>
                Undo? ({undoTimer})
              </DataRowText>
              <SecondaryButton onPress={handleUndo}>
                <DataRowText style={{ color: "#0F4A4A", fontWeight: "bold" }}>
                  Undo
                </DataRowText>
              </SecondaryButton>
            </DataRow>
          )}
        </TaskContentContainer>
        <CheckBoxContainer onPress={checkTask} isChecked={isChecked}>
          {isChecked && <Image source={WhiteCheckboxIcon} />}
        </CheckBoxContainer>
      </TaskContainer>
    </Animated.View>
  );
};
