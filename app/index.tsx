import { StyledView, StyledText } from "../utils/nativewind-styled";

export default function AppLayout() {
  return (
    <StyledView className="bg-purple-800 flex-1 items-center justify-center">
      <StyledText className="text-white text-2xl font-PromptRegular">
        My Awesome
      </StyledText>
      <StyledText className="text-yellow-300 text-4xl font-PromptBold">
        Camera App
      </StyledText>
    </StyledView>
  );
}
