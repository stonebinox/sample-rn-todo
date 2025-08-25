import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Dimensions, View, StyleSheet, Text, Modal } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { GestureResponderEvent } from "react-native";

import {
  BarWrap,
  Container,
  FabButton,
  FabButtonInner,
  HeaderBar,
  IconGroup,
  StyledIcon,
  StyledTabItem,
  TabPill,
  Title,
  UserGreetingRow,
} from "./App.styles";
import NotificationBell from "./assets/notification.png";
import History from "./assets/history.png";
import { TasksView } from "./src/components/task-view";
import { TaskProvider } from "./src/contexts/task-provider";
import { AddTaskModal } from "./src/components/add-task-modal";

const TAB_COLOR = "#0F4A4A";

/* -------------------- VISUAL-ONLY BOTTOM BAR -------------------- */
const FakeBottomTabs = () => {
  const inset = useSafeAreaInsets();

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <BarWrap style={{ paddingBottom: Math.max(inset.bottom, 12) }}>
        <TabPill>
          <TabItem
            label="Home"
            icon={
              <MaterialCommunityIcons
                name="home-outline"
                size={22}
                color={TAB_COLOR}
              />
            }
          />
          <TabItem
            label="My Work"
            active
            icon={
              <MaterialCommunityIcons
                name="briefcase-outline"
                size={22}
                color={TAB_COLOR}
              />
            }
          />

          <View style={{ width: 64 }} />

          <TabItem
            label="Insights"
            icon={
              <MaterialCommunityIcons
                name="chart-line"
                size={22}
                color={TAB_COLOR}
              />
            }
          />
          <TabItem
            label="Profile"
            icon={
              <MaterialIcons
                name="person-outline"
                size={22}
                color={TAB_COLOR}
              />
            }
          />
        </TabPill>
      </BarWrap>
    </View>
  );
};

const TabItem = ({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => {
  return (
    <StyledTabItem>
      {icon}
      <View style={{ height: 4 }} />
      <View>
        <Text
          style={{
            fontWeight: active ? "600" : "500",
            opacity: active ? 1 : 0.9,
            fontSize: 12,
            color: TAB_COLOR,
          }}
        >
          {label}
        </Text>
      </View>
    </StyledTabItem>
  );
};

/* -------------------- CENTER FAB (adds a task) -------------------- */
const AddButton = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <FabButton
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Add task"
      activeOpacity={0.9}
    >
      <FabButtonInner>
        <MaterialIcons name="add" size={36} color="#fff" />
      </FabButtonInner>
    </FabButton>
  );
};
/* --------------------------------------------------------------- */

export default function App() {
  const layout = Dimensions.get("window");
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
  });
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: "tasks", title: "Tasks" },
    { key: "reminders", title: "Reminders" },
    { key: "meetings", title: "Meetings" },
    { key: "notes", title: "Notes" },
  ]);
  const [isAddTaskVisible, setIsAddTaskVisible] = useState<boolean>(false);

  if (!fontsLoaded) return null;

  const renderScene = SceneMap({
    tasks: TasksView,
    reminders: () => <View />,
    meetings: () => <View />,
    notes: () => <View />,
  });

  return (
    <SafeAreaProvider>
      <Container>
        <TaskProvider>
          <StatusBar style="auto" />
          <HeaderBar>
            <Title>My Work</Title>
            <IconGroup>
              <StyledIcon source={NotificationBell} />
              <StyledIcon source={History} />
            </IconGroup>
          </HeaderBar>

          <View style={{ flex: 1, paddingBottom: 96 }}>
            <UserGreetingRow>
              <Title>Good morning, Louis!</Title>
            </UserGreetingRow>

            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={{
                    backgroundColor: "#1C385D",
                    width: 40,
                    marginLeft: 30,
                    height: 0,
                    borderWidth: 3,
                    borderRadius: 3,
                    borderColor: "#1C385D",
                  }}
                  style={{ backgroundColor: "#F9FAFB", marginBottom: 16 }}
                  activeColor="#1C385D"
                  inactiveColor="#333333"
                />
              )}
            />
          </View>

          <AddButton
            onPress={() => {
              setIsAddTaskVisible(true);
            }}
          />

          {/* visual-only bottom bar */}
          <FakeBottomTabs />

          {isAddTaskVisible && (
            <Modal
              visible={isAddTaskVisible}
              animationType="slide"
              onRequestClose={() => setIsAddTaskVisible(false)}
            >
              <AddTaskModal onClose={() => setIsAddTaskVisible(false)} />
            </Modal>
          )}
        </TaskProvider>
      </Container>
    </SafeAreaProvider>
  );
}
