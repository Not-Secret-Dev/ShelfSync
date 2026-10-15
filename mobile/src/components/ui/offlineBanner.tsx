import { WifiOff, HardDrive } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type OfflineBannerProps = {
  message?: string;
};

export function OfflineBanner({
  message = "Your inventory remains available on this device.",
}: OfflineBannerProps) {
  return (
    <View
      style={styles.container}
      accessibilityRole="summary"
      accessibilityLabel={`Offline mode. ${message}`}
    >
      <View style={styles.iconContainer}>
        <WifiOff size={18} color={colors.warning} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>You’re offline</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.statusRow}>
          <HardDrive size={13} color={colors.success} />
          <Text style={styles.statusText}>DEVICE STORAGE</Text>
          <View style={styles.dot} />
          <Text style={styles.pendingText}>SYNC PAUSED</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.warningBackground,
    borderColor: "#FDE68A",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.lg,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.label,
    color: colors.warning,
  },
  message: {
    ...typography.bodySM,
    color: colors.textSecondary,
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  statusText: {
    ...typography.label,
    color: colors.success,
    fontSize: 10,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textMuted,
  },
  pendingText: {
    ...typography.label,
    color: colors.warning,
    fontSize: 10,
  },
});
