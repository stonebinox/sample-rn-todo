import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
`;

export const ModalCard = styled.View`
  width: 90%;
  background: #fff;
  border-radius: 16px;
  padding: 24px 20px 20px 20px;
  align-items: stretch;
  elevation: 4;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 1;
`;

export const CloseText = styled.Text`
  font-size: 28px;
  color: #888;
`;

export const Heading = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  align-self: center;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 16px;
  color: #222;
`;

export const LabelRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const LabelBtn = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ active }) => (active ? "#0F4A4A" : "#ccc")};
  margin: 0 4px;
`;

export const LabelBtnText = styled.Text<{ active: boolean }>`
  text-align: center;
  color: #333;
  font-weight: 500;
`;

export const DateBtn = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  background: #f0f0f0;
  margin-bottom: 16px;
  align-items: center;
`;

export const DateBtnText = styled.Text`
  color: #0f4a4a;
  font-weight: 500;
`;

export const SubmitButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  background: #0f4a4a;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
