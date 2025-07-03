import { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import colorPalette from "../constants/color-palette";
import { makeColorBrighter } from "../utils/color-utils";

const { width } = Dimensions.get("window");
const GRID_SIZE = Math.min(width * 0.8, 300);
const GAP = 24;
const GRID_COLUMNS = 3;
const GRID_ROWS = 3;
const SQUARE_SIZE = (GRID_SIZE - GAP * (GRID_COLUMNS + 1)) / GRID_COLUMNS;

interface SquareGridProps {
  onSquarePress: (squareIndex: number) => void;
  highlightedSquare: number | null;
  disabled?: boolean;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function SquareGrid({
  onSquarePress,
  highlightedSquare,
  disabled = false,
}: SquareGridProps) {
  const highlightAnimation = useSharedValue(0);

  useEffect(() => {
    if (highlightedSquare !== null) {
      highlightAnimation.value = withTiming(1, { duration: 300 }, () => {
        highlightAnimation.value = withTiming(0, { duration: 300 });
      });
    }
  }, [highlightedSquare]);

  const getSquareColor = (index: number) => {
    const colors = [
      colorPalette.accent,
      colorPalette.accentSecondary,
      colorPalette.accentTertiary,
      colorPalette.accentBlue,
      colorPalette.accentGreen,
      colorPalette.accentYellow,
      colorPalette.accentGray,
      colorPalette.accentPurple,
      colorPalette.accentOrange,
    ];
    return colors[index];
  };

  const renderSquare = (index: number, colIndex: number) => {
    const isHighlighted = highlightedSquare === index;
    const isLastInRow = colIndex === GRID_COLUMNS - 1;
    const baseColor = getSquareColor(index);
    const brighterColor = makeColorBrighter(baseColor);

    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(highlightAnimation.value, [0, 1], [1, 1.1]);
      const opacity = interpolate(highlightAnimation.value, [0, 1], [0.3, 1]);
      const backgroundColor = interpolate(
        highlightAnimation.value,
        [0, 1],
        [0, 1],
      );
      return {
        transform: [{ scale }],
        opacity,
        backgroundColor: backgroundColor > 0.5 ? brighterColor : baseColor,
      };
    });

    return (
      <AnimatedTouchableOpacity
        key={index}
        style={[
          styles.square,
          {
            backgroundColor: baseColor,
            marginRight: isLastInRow ? 0 : GAP,
          },
          isHighlighted ? animatedStyle : {},
        ]}
        onPress={() => !disabled && onSquarePress(index)}
        disabled={disabled}
        activeOpacity={0.8}
      />
    );
  };

  const renderRow = (rowIndex: number) => {
    const squares = [];
    for (let colIndex = 0; colIndex < GRID_COLUMNS; colIndex++) {
      const squareIndex = rowIndex * GRID_COLUMNS + colIndex;
      squares.push(renderSquare(squareIndex, colIndex));
    }
    return (
      <View
        key={rowIndex}
        style={[
          styles.row,
          { marginBottom: rowIndex === GRID_ROWS - 1 ? 0 : GAP },
        ]}
      >
        {squares}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: GRID_ROWS }, (_, index) => renderRow(index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    backgroundColor: colorPalette.backgroundLight,
    borderRadius: 12,
    height: GRID_SIZE,
    padding: GAP,
    width: GRID_SIZE,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  square: {
    borderRadius: 8,
    height: SQUARE_SIZE,
    opacity: 0.3,
    width: SQUARE_SIZE,
  },
});
