
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import type { ReactNode } from "react";
import { colors, radius } from "../../constants/theme";

type FABProps = {
  icon: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

export function FAB({
  icon,
  onPress,
  accessibilityLabel,
  style,
}: FABProps) {
  return (
    <View style={[styles.shadow, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        {icon}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  pressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.97 }],
  },
});
