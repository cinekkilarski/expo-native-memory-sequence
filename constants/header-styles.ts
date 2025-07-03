import colorPalette from "./color-palette";

export const headerStyles = {
  headerStyle: {
    backgroundColor: colorPalette.background,
  },
  headerTintColor: colorPalette.text,
  headerTitleStyle: {
    fontWeight: "bold" as const,
    fontFamily: "SpaceMono",
    fontSize: 24,
    color: colorPalette.text,
  },
  headerTitleAlign: "center" as const,
  headerShadowVisible: false,
  headerShown: false,
};
