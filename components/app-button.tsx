import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colorPalette from "../constants/color-palette";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
  backgroundColor?: string;
  textColor?: string;
  style?: React.ComponentProps<typeof TouchableOpacity>["style"];
  iconColor?: string;
}

export default function AppButton({
  title,
  onPress,
  icon,
  backgroundColor = colorPalette.accentGreen,
  textColor = colorPalette.buttonText,
  style,
  iconColor = colorPalette.buttonText,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {icon && (
          <FontAwesome
            name={icon}
            size={24}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    elevation: 5,
    marginVertical: 8,
    overflow: "hidden",
    shadowColor: colorPalette.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontFamily: "SpaceMono",
    fontSize: 20,
    fontWeight: "bold",
  },
});
