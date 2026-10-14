
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors, spacing, typography } from "../../constants/theme";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          hitSlop={8}
          style={styles.action}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
          <ChevronRight size={16} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  textContainer: { flex: 1, gap: spacing.xs },
  title: { ...typography.headlineMD, color: colors.text },
  subtitle: { ...typography.bodySM, color: colors.textSecondary },
  action: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  actionText: {
    ...typography.bodySM,
    color: colors.primary,
    fontWeight: "600",
  },
});
