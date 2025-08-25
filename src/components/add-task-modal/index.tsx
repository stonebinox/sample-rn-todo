import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "styled-components/native";
import {
  CloseButton,
  CloseText,
  DateBtn,
  DateBtnText,
  Heading,
  Input,
  LabelBtn,
  LabelBtnText,
  LabelRow,
  ModalCard,
  ModalContainer,
  SubmitButton,
  SubmitButtonText,
} from "./index.styles";
import { useTasks } from "../../contexts/task-provider";

type AddTaskModalProps = {
  onClose: () => void;
};

export const AddTaskModal = ({ onClose }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState<"Maintenance" | "Clients">("Maintenance");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { addTask } = useTasks();

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");

    if (selectedDate) {
      setDueDate(selectedDate);
      setShowDatePicker(false);
    }
  };

  const handleAddTask = () => {
    addTask({ title, label, dueDate });
    onClose();
  };

  return (
    <ModalContainer>
      <ModalCard>
        <CloseButton onPress={onClose}>
          <CloseText>×</CloseText>
        </CloseButton>
        <Heading>Add Task</Heading>
        <Input
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#888"
        />
        <LabelRow>
          <LabelBtn
            active={label === "Maintenance"}
            onPress={() => setLabel("Maintenance")}
          >
            <LabelBtnText active={label === "Maintenance"}>
              Maintenance
            </LabelBtnText>
          </LabelBtn>
          <LabelBtn
            active={label === "Clients"}
            onPress={() => setLabel("Clients")}
          >
            <LabelBtnText active={label === "Clients"}>Clients</LabelBtnText>
          </LabelBtn>
        </LabelRow>
        <DateBtn onPress={() => setShowDatePicker(true)}>
          <DateBtnText>Due Date: {dueDate.toLocaleDateString()}</DateBtnText>
        </DateBtn>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            style={{ marginBottom: 16 }}
          />
        )}
        <SubmitButton onPress={handleAddTask}>
          <SubmitButtonText>Add Task</SubmitButtonText>
        </SubmitButton>
      </ModalCard>
    </ModalContainer>
  );
};
