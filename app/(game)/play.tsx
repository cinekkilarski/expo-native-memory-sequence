import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import SquareGrid from "../../components/square-grid";
import { MemorySequenceGame, GameState } from "../../games/game-logic";
import colorPalette from "../../constants/color-palette";

export default function PlayScreen() {
  const router = useRouter();
  const [game] = useState(() => new MemorySequenceGame());
  const [gameState, setGameState] = useState<GameState>(game.getInitialState());
  const [highlightedSquare, setHighlightedSquare] = useState<number | null>(
    null,
  );
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const sequenceIntervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const correctTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    try {
      startNewLevel();
    } catch (error) {
      console.error("PlayScreen: Error in useEffect:", error);
    }
    return () => {
      clearIntervals();
    };
  }, []);

  const clearIntervals = () => {
    if (sequenceIntervalRef.current) {
      clearInterval(sequenceIntervalRef.current);
      sequenceIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (correctTimeoutRef.current) {
      clearTimeout(correctTimeoutRef.current);
      correctTimeoutRef.current = null;
    }
  };

  const startNewLevel = () => {
    try {
      const newState = game.startLevel();
      setGameState(newState);
      setHighlightedSquare(null);
      setCountdown(3);
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownIntervalRef.current!);
            countdownIntervalRef.current = null;
            setCountdown(null);
            showSequence();
            return null;
          }
          return prev! - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("PlayScreen: Error in startNewLevel:", error);
    }
  };

  const showSequence = () => {
    try {
      const sequence = game.getSequence();
      let index = 0;

      sequenceIntervalRef.current = setInterval(() => {
        if (index < sequence.length) {
          setHighlightedSquare(sequence[index]);

          index++;
        } else {
          clearInterval(sequenceIntervalRef.current!);
          sequenceIntervalRef.current = null;
          startPlayerTurn();
        }
      }, 800);
    } catch (error) {
      console.error("PlayScreen: Error in showSequence:", error);
    }
  };

  const startPlayerTurn = () => {
    const newState = game.startPlayerTurn();
    setGameState(newState);
    setHighlightedSquare(null);
    startTimer();
  };

  const startTimer = () => {
    let timeRemaining = 5;

    timerIntervalRef.current = setInterval(() => {
      timeRemaining -= 0.1;
      const newState = game.updateTimeRemaining(timeRemaining);
      setGameState(newState);

      if (timeRemaining <= 0) {
        clearInterval(timerIntervalRef.current!);
        timerIntervalRef.current = null;
        handleGameOver();
      }
    }, 100);
  };

  const handleSquarePress = (squareIndex: number) => {
    if (gameState.isShowingSequence || countdown !== null || showCorrect)
      return;

    setHighlightedSquare(squareIndex);

    const newState = game.addPlayerInput(squareIndex);
    setGameState(newState);

    setTimeout(() => {
      setHighlightedSquare(null);
    }, 200);

    if (newState.gameOver) {
      clearIntervals();
      handleGameOver();
    } else if (newState.level > gameState.level) {
      clearIntervals();
      setShowCorrect(true);
      correctTimeoutRef.current = setTimeout(() => {
        setShowCorrect(false);
        startNewLevel();
      }, 1000);
    }
  };

  const handleGameOver = () => {
    clearIntervals();
    router.push({
      pathname: "/(game)/game-over",
      params: { score: game.getScore().toString() },
    });
  };

  const formatTime = (time: number) => {
    return time.toFixed(1);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.scoreContainer}>
              <FontAwesome name="star" size={20} color={colorPalette.star} />
              <Text style={styles.scoreText}>Score: {gameState.score}</Text>
            </View>

            <View style={styles.levelContainer}>
              <FontAwesome
                name="trophy"
                size={20}
                color={colorPalette.trophy}
              />
              <Text style={styles.levelText}>Level: {gameState.level}</Text>
            </View>
          </View>

          <View style={styles.gameContainer}>
            <SquareGrid
              onSquarePress={handleSquarePress}
              highlightedSquare={highlightedSquare}
              disabled={
                gameState.isShowingSequence || countdown !== null || showCorrect
              }
            />
            {countdown !== null && (
              <View style={styles.countdownOverlay}>
                <Text style={styles.countdownText}>
                  {countdown === 0 ? "GO!" : countdown}
                </Text>
              </View>
            )}
            {showCorrect && (
              <View style={styles.correctOverlay}>
                <Text style={styles.correctText}>Correct!</Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            {countdown !== null ? (
              <View style={styles.messageContainer}>
                <FontAwesome name="hourglass-start" size={24} color="#feca57" />
                <Text style={styles.messageText}>Get ready...</Text>
              </View>
            ) : showCorrect ? (
              <View style={styles.messageContainer}>
                <FontAwesome name="check" size={24} color="#4ecdc4" />
                <Text style={styles.messageText}>Correct! Next level...</Text>
              </View>
            ) : gameState.isShowingSequence ? (
              <View style={styles.messageContainer}>
                <FontAwesome name="eye" size={24} color="#4ecdc4" />
                <Text style={styles.messageText}>Watch the sequence!</Text>
              </View>
            ) : (
              <View style={styles.messageContainer}>
                <FontAwesome name="clock-o" size={24} color="#ff6b6b" />
                <Text style={styles.messageText}>
                  Time: {formatTime(gameState.timeRemaining)}s
                </Text>
              </View>
            )}
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
  correctOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: colorPalette.backgroundLight,
    borderRadius: 20,
    justifyContent: "center",
    zIndex: 2,
  },
  correctText: {
    color: colorPalette.accent,
    fontFamily: "SpaceMono",
    fontSize: 48,
    fontWeight: "bold",
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: colorPalette.shadowDark,
    borderRadius: 20,
    justifyContent: "center",
    zIndex: 3,
  },
  countdownText: {
    color: colorPalette.text,
    fontFamily: "SpaceMono",
    fontSize: 72,
    fontWeight: "bold",
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  gameContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  levelContainer: {
    alignItems: "center",
    backgroundColor: colorPalette.backgroundLight,
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  levelText: {
    color: colorPalette.text,
    fontFamily: "SpaceMono",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  messageContainer: {
    alignItems: "center",
    backgroundColor: colorPalette.backgroundLight,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  messageText: {
    color: colorPalette.text,
    fontFamily: "SpaceMono",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  safeArea: {
    backgroundColor: colorPalette.background,
    flex: 1,
  },
  scoreContainer: {
    alignItems: "center",
    backgroundColor: colorPalette.backgroundLight,
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scoreText: {
    color: colorPalette.text,
    fontFamily: "SpaceMono",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
