import { Stack } from "expo-router";

export default function TodoLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          title: "| Camera",
        }}
      />
      <Stack.Screen
        name="review"
        options={{
          title: "Review",
        }}
      />
    </Stack>
  );
}
