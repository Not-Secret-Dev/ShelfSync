import { Pressable, StyleSheet, Text } from "react-native";
import { ReactNode } from "react";

import { colors, radius, spacing, typography } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  leftIcon?: ReactNode;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.label,
          isPrimary ? styles.primaryLabel : styles.secondaryLabel,
          disabled && styles.disabledLabel,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    backgroundColor: "#E5E7EB",
    borderColor: "#E5E7EB",
  },
  label: {
    ...typography.bodyLG,
    fontWeight: "600",
    textAlign: "center",
  },
  primaryLabel: {
    color: colors.onPrimary,
  },
  secondaryLabel: {
    color: colors.text,
  },
  disabledLabel: {
    color: colors.disabled,
  },
});
