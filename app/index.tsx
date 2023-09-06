import { View, Text } from "react-native";
import { styled } from "nativewind";
import { FONT } from "../constants/theme";
const StyledView = styled(View);
const StyledText = styled(Text);

export default function AppLayout() {
  return (
    <StyledView className="bg-purple-800 flex-1 items-center justify-center">
      <StyledText className="text-white text-2xl font-bold">
        My Awesome
      </StyledText>
      <StyledText className="text-yellow-300 text-4xl italic font-bold">
        Camera App
      </StyledText>
    </StyledView>
  );
}
