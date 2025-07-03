import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import colorPalette from "../../constants/color-palette";
import AppButton from "../../components/app-button";

const { width } = Dimensions.get("window");

export default function GameOverScreen() {
  const { score } = useLocalSearchParams();
  const finalScore = typeof score === "string" ? parseInt(score, 10) : 0;

  const handlePlayAgain = () => {
    router.replace("/(game)/play");
  };

  const handleBackToStart = () => {
    router.replace("/");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name="gamepad"
                size={100}
                color={colorPalette.accent}
              />
            </View>

            <Text style={styles.title}>Game Over!</Text>

            <View style={styles.scoreContainer}>
              <FontAwesome name="star" size={24} color={colorPalette.star} />
              <Text style={styles.scoreText}>Final Score: {finalScore}</Text>
            </View>

            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                Great effort! Your memory skills are impressive.
              </Text>
              <Text style={styles.messageText}>
                Keep practicing to improve your score!
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <AppButton
                title="Play Again"
                icon="refresh"
                onPress={handlePlayAgain}
                backgroundColor={colorPalette.accent}
              />
              <AppButton
                title="Back to Start"
                icon="home"
                onPress={handleBackToStart}
                backgroundColor={colorPalette.buttonAlt}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 20,
    width: "100%",
  },
  container: {
    backgroundColor: colorPalette.background,
    flex: 1,
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  messageContainer: {
    backgroundColor: colorPalette.backgroundLight,
    borderRadius: 20,
    marginBottom: 50,
    padding: 24,
    width: width * 0.9,
  },
  messageText: {
    color: colorPalette.textTertiary,
    fontFamily: "SpaceMono",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  safeArea: {
    backgroundColor: colorPalette.background,
    flex: 1,
  },
  scoreContainer: {
    alignItems: "center",
    backgroundColor: colorPalette.backgroundLight,
    borderRadius: 25,
    flexDirection: "row",
    marginBottom: 40,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  scoreText: {
    color: colorPalette.text,
    fontFamily: "SpaceMono",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
  },
  title: {
    color: colorPalette.text,
    fontFamily: "SpaceMono",
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
