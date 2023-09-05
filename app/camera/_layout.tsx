import { TouchableOpacity } from "react-native-gesture-handler";
import { Stack, Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TodoLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          title: "| My Todos",
          headerRight: () => <AboutMenu />,
        }}
      />
      <Stack.Screen
        name="review"
        options={{
          title: "About",
        }}
      />
    </Stack>
  );
}

const AboutMenu = () => {
  return (
    <Link href="/todo/about">
      <TouchableOpacity onPress={() => {}} style={{ paddingRight: 10 }}>
        <Ionicons name="help-circle-outline" size={32} />
      </TouchableOpacity>
    </Link>
  );
};
