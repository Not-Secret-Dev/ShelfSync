
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../../constants/theme";

type StatusVariant =
  | "success"
  | "warning"
  | "danger"
  | "pending"
  | "neutral";

type StatusChipProps = {
  label: string;
  variant?: StatusVariant;
};

const palette = {
  success: { background: colors.successBackground, text: colors.success },
  warning: { background: colors.warningBackground, text: colors.warning },
  danger: { background: colors.dangerBackground, text: colors.danger },
  pending: { background: colors.pendingBackground, text: colors.pending },
  neutral: { background: colors.surfaceLow, text: colors.textSecondary },
};

export function StatusChip({
  label,
  variant = "neutral",
}: StatusChipProps) {
  const current = palette[variant];

  return (
    <View
      accessibilityRole="text"
      style={[styles.chip, { backgroundColor: current.background }]}
    >
      <Text style={[styles.label, { color: current.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  label: {
    ...typography.bodySM,
    fontWeight: "600",
  },
});
