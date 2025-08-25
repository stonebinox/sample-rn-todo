import styled from "styled-components/native";

export const TaskContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #fff;
  gap: 10px;
  padding: 10px;
`;

export const CheckIconContainer = styled.View`
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const TaskContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 272px;
  gap: 4px;
`;

export const TaskTitle = styled.Text`
  font-family: "Inter_600SemiBold";
  font-size: 14px;
  color: #333;
  text-align: left;
`;

export const DataRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

export const DataRowText = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 11px;
  color: #333;
`;

export const RedDot = styled.View`
  background-color: #c51111;
  width: 9px;
  height: 9px;
  border-radius: 9px;
`;

export const OverdueText = styled.Text`
  font-family: "Inter_400Regular";
  font-size: 11px;
  color: #c51111;
`;

interface CheckBoxContainerProps {
  isChecked: boolean;
}

export const CheckBoxContainer = styled.TouchableOpacity<CheckBoxContainerProps>`
  width: 32px;
  height: 32px;
  background-color: ${({ isChecked }) => (isChecked ? "#90D0AA" : "#E5FFF0")};
  border-width: 1px;
  border-color: rgba(17, 60, 34, 0.15);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 2;
  border-radius: 4px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
