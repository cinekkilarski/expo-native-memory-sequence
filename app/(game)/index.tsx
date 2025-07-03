import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { router, Stack } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import colorPalette from "../../constants/color-palette";
import AppButton from "../../components/app-button";

const { width } = Dimensions.get("window");

export default function StartScreen() {
  const handleStartGame = () => {
    router.push("/(game)/play");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <FontAwesome
                name="lightbulb-o"
                size={80}
                color={colorPalette.accent}
              />
              <Text style={styles.title}>Sequence Memory</Text>
              <Text style={styles.subtitle}>Human Benchmark Style</Text>
            </View>

            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>How to play:</Text>
              <View style={styles.instructionItem}>
                <FontAwesome
                  name="circle"
                  size={16}
                  color={colorPalette.accent}
                />
                <Text style={styles.instructionText}>
                  Watch the sequence of highlighted squares
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <FontAwesome
                  name="circle"
                  size={16}
                  color={colorPalette.accent}
                />
                <Text style={styles.instructionText}>
                  Repeat the sequence in the same order
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <FontAwesome
                  name="circle"
                  size={16}
                  color={colorPalette.accent}
                />
                <Text style={styles.instructionText}>
                  Each level adds one more square to remember
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <FontAwesome
                  name="circle"
                  size={16}
                  color={colorPalette.accent}
                />
                <Text style={styles.instructionText}>
                  You have 5 seconds to complete each sequence
                </Text>
              </View>
            </View>

            <AppButton
              title="Start Game"
              icon="play"
              onPress={handleStartGame}
              backgroundColor={colorPalette.accent}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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
  instructionItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  instructionText: {
    color: colorPalette.textTertiary,
    flex: 1,
    fontFamily: "SpaceMono",
    fontSize: 16,
    marginLeft: 12,
  },
  instructionsContainer: {
    backgroundColor: colorPalette.backgroundLight,
    borderRadius: 20,
    marginBottom: 40,
    padding: 24,
    width: width * 0.9,
  },
  instructionsTitle: {
    color: colorPalette.text,
    fontFamily: "SpaceMono",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  safeArea: {
    backgroundColor: colorPalette.background,
    flex: 1,
  },
  subtitle: {
    color: colorPalette.textSecondary,
    fontFamily: "SpaceMono",
    fontSize: 18,
    marginTop: 8,
  },
  title: {
    color: colorPalette.text,
    fontFamily: "SpaceMono",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
});
