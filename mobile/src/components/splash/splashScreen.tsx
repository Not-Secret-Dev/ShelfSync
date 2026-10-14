import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const GREEN = "#1B4332";
const MINT = "#AEEECB";

function DrawingPath({
  d,
  length,
  delay = 0,
}: {
  d: string;
  length: number;
  delay?: number;
}) {
  const progress = useSharedValue(length);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(0, {
        duration: 520,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [delay, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: progress.value,
  }));

  return (
    <AnimatedPath
      d={d}
      fill="none"
      stroke={MINT}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={`${length} ${length}`}
      animatedProps={animatedProps}
    />
  );
}

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <Svg width={112} height={112} viewBox="0 0 48 48">
          {/* Package outline */}
          <DrawingPath d="M24 4 40 13 40 35 24 44 8 35 8 13 Z" length={130} />

          {/* Top folds draw in sequence */}
          <DrawingPath d="M8 13 24 22 40 13" length={45} delay={420} />

          <DrawingPath d="M24 22V44" length={26} delay={700} />

          <DrawingPath d="M16 8.5 32 17.5" length={26} delay={900} />
        </Svg>

        <Animated.View
          entering={FadeInUp.delay(950).duration(550)}
          style={styles.wordmark}
        >
          <Text style={styles.title}>ShelfSync</Text>
          <Text style={styles.tagline}>Your inventory. In sync.</Text>
        </Animated.View>
      </View>

      <Text style={styles.footer}>INVENTORY, SIMPLIFIED</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  brand: {
    alignItems: "center",
    gap: 20,
  },
  wordmark: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "Inter",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.7,
  },
  tagline: {
    color: MINT,
    fontFamily: "Inter",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  footer: {
    position: "absolute",
    bottom: 44,
    color: "#D8F3DC",
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 2,
  },
});
