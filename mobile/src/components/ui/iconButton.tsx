
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { ReactNode } from "react";
import { colors, radius } from "../../constants/theme";

type IconButtonProps = Omit<PressableProps, "children" | "style"> & {
  icon: ReactNode;
  accessibilityLabel: string;
  size?: number;
  variant?: "plain" | "filled" | "outlined";
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  accessibilityLabel,
  size = 44,
  variant = "plain",
  disabled,
  style,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      hitSlop={4}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          backgroundColor:
            variant === "filled" ? colors.surfaceLow : "transparent",
          borderColor:
            variant === "outlined" ? colors.border : "transparent",
          borderWidth: variant === "outlined" ? 1 : 0,
          opacity: disabled ? 0.5 : pressed ? 0.65 : 1,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
  },
});
