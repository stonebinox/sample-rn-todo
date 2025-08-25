import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f9fafb;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
`;

export const HeaderBar = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const Title = styled.Text`
  font-family: "Inter_600SemiBold";
  font-size: 16px;
`;

export const IconGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 13px;
`;

export const StyledIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const UserGreetingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 22px;
`;

export const BarWrap = styled.View`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0;
`;

export const TabPill = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  padding-vertical: 10px;
  padding-horizontal: 18px;
  background-color: #ffffff;
  shadow-color: #000;
  shadow-radius: 12px;
  elevation: 6;
`;

export const StyledTabItem = styled.View`
  min-width: 70px;
  align-items: center;
  justify-content: center;
`;

export const FabButton = styled.TouchableOpacity`
  position: absolute;
  align-self: center;
  bottom: 44px;
  z-index: 10;
`;

export const FabButtonInner = styled.View`
  width: 75px;
  height: 75px;
  border-radius: 75px;
  background-color: #064148;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 8;
`;
