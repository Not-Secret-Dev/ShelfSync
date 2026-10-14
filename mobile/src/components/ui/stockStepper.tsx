
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { colors, radius, spacing, typography } from "../../constants/theme";

type StockStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
};

export function StockStepper({
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  disabled = false,
}: StockStepperProps) {
  const canDecrease = !disabled && value > min;
  const canIncrease = !disabled && value < max;

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        accessibilityState={{ disabled: !canDecrease }}
        disabled={!canDecrease}
        hitSlop={2}
        onPress={() => onChange(Math.max(min, value - 1))}
        style={({ pressed }) => [
          styles.button,
          pressed && canDecrease && styles.pressed,
        ]}
      >
        <Minus
          size={17}
          color={canDecrease ? colors.text : colors.disabled}
        />
      </Pressable>

      <Text
        accessibilityLabel={`Quantity ${value}`}
        style={styles.value}
      >
        {value}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        accessibilityState={{ disabled: !canIncrease }}
        disabled={!canIncrease}
        hitSlop={2}
        onPress={() => onChange(Math.min(max, value + 1))}
        style={({ pressed }) => [
          styles.button,
          pressed && canIncrease && styles.pressed,
        ]}
      >
        <Plus
          size={17}
          color={canIncrease ? colors.primary : colors.disabled}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    minWidth: 28,
    textAlign: "center",
    color: colors.text,
    ...typography.numericMD,
  },
  pressed: { backgroundColor: colors.surfaceLow },
  disabled: { opacity: 0.65 },
});
