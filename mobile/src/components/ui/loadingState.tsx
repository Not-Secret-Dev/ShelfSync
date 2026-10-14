import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";

type LoadingStateProps = {
  message?: string;
  fullScreen?: boolean;
};

export function LoadingState({
  message = "Loading...",
  fullScreen = false,
}: LoadingStateProps) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.md,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  message: {
    ...typography.bodyMD,
    color: colors.textSecondary,
  },
});
